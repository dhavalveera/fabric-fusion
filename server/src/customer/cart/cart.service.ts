import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { DataSource, In, Repository } from "typeorm";

// Custom Exceptions
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Type
import { UserType } from "src/all-types";

// Model
import { ProductSizeModel } from "src/admin/product-size/entities/product-size.entity";
import { CartsModel } from "./entities/cart.entity";

// DTO (Data Transfer Object)
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartQuantityDto } from "./dto/update-cart.dto";
import { DeleteCartDto } from "./dto/delete-cart.dto";

// CONSTANT
import { CartStatus } from "./constants";

// Types
import { GetAllCartItems } from "./type";

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  private readonly productSizeRepository: Repository<ProductSizeModel>;

  constructor(
    @InjectRepository(CartsModel) private readonly cartsRepository: Repository<CartsModel>,
    private readonly dataSource: DataSource,
  ) {
    this.productSizeRepository = this.dataSource.getRepository(ProductSizeModel);
  }

  async create(createCartDto: CreateCartDto, userInfo: UserType) {
    const createdCart = this.cartsRepository.create({
      ...createCartDto,
      addedAt: new Date(),
      productDetailsFk: { productDetailsId: createCartDto.productDetailsFk },
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
      productSizeFk: { productSizeId: createCartDto.productSizeFk },
    });

    const cartsData = await this.cartsRepository.save(createdCart);

    if (cartsData) {
      this.logger.log(`Product added to Cart Successfully for User (${userInfo.name})`);

      throw new CreatedException(`Product added to Cart Successfully!.`);
    } else {
      this.logger.warn("Unable to added Product to the Cart");

      throw new UnsuccessfulException();
    }
  }

  async findAll(userInfo: UserType): Promise<{ rows: GetAllCartItems[]; count: number }> {
    const [rows, count] = await this.cartsRepository.findAndCount({
      where: { customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false, cartStatus: CartStatus.Active },
      relations: ["productDetailsFk", "productSizeFk"],
    });

    if (count > 0) {
      this.logger.log(`Found total ${count} Products in Cart for Customer - ${userInfo.name}`);

      const mappedRows: GetAllCartItems[] = rows.map(cart => {
        const inStock = cart.productSizeFk.stockRemaining > 0; // Check stock for the selected size

        return { ...cart, inStock };
      });

      return { count, rows: mappedRows };
    } else {
      this.logger.error("Unable to find any Products in the Cart");

      throw new UnsuccessfulException();
    }
  }

  async updateCart(id: string, updateCartBody: UpdateCartQuantityDto, userInfo: UserType) {
    // Find the cart item, including the product size details to get the remaining stock
    const cartItem = await this.cartsRepository.findOne({
      where: { cartDetailsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, cartStatus: CartStatus.Active, isDeleted: false },
      relations: ["productDetailsFk"],
    });

    if (!cartItem) {
      this.logger.error("Cart item not found");

      throw new NotFoundException("Cart item not found");
    }

    // Fetch the `remainingStock` for this product size
    const productSize = await this.productSizeRepository.findOne({
      where: { productDetailFk: { productDetailsId: cartItem.productDetailsFk.productDetailsId }, isDeleted: false },
    });

    if (!productSize) {
      this.logger.error("Associated product size not found");

      throw new NotFoundException("Associated product size not found");
    }

    const remainingStock = productSize.stockRemaining;

    // Enforce the quantity constraints
    if (updateCartBody.quantity < 1) {
      this.logger.error("Quantity cannot be less than 1");

      throw new UnsuccessfulException("Quantity cannot be less than 1");
    }

    if (updateCartBody.quantity > remainingStock) {
      this.logger.error(`Quantity cannot exceed available stock of ${remainingStock}`);

      throw new UnsuccessfulException(`Quantity cannot exceed available stock of ${remainingStock}`);
    }

    // Update the cart item quantity
    cartItem.productQuantity = updateCartBody.quantity;

    const updatedCartData = await this.cartsRepository.save(cartItem);

    if (updatedCartData) {
      this.logger.log(`Updated the Product (${cartItem.productDetailsFk.productName}) Quantity (${cartItem.productQuantity}) Successfully!.`);

      throw new SuccessException(`Updated the Product Quantity for Product (${cartItem.productDetailsFk.productName}) - (${cartItem.productQuantity}) Successfully!.`);
    } else {
      this.logger.warn(`Unable to update the Product Quantity for Product - (${cartItem.productDetailsFk.productName}).`);

      throw new UnsuccessfulException(`Unable to update the Product Quantity for Product - (${cartItem.productDetailsFk.productName}).`);
    }
  }

  async deleteCart(id: string, userInfo: UserType) {
    const isCartAvailable = await this.cartsRepository.findOne({ where: { cartDetailsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false } });

    if (isCartAvailable) {
      const updatedCart = await this.cartsRepository.delete({
        cartDetailsId: id,
        isDeleted: false,
        cartStatus: CartStatus.Active,
        customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
      });

      if (updatedCart) {
        this.logger.log(`Deleted Cart Item successfully for Customer/User - ${userInfo.name}`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Delete the Cart Item for Customer/User - ${userInfo.name}`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.warn(`No Cart Item Found for Cart ID - ${id} for Customer/User - ${userInfo.name}`);

      throw new NotFoundException();
    }
  }

  async deleteAllCart(deleteCartItemsDto: DeleteCartDto, userInfo: UserType) {
    const { cartItemIds } = deleteCartItemsDto;

    if (!cartItemIds || cartItemIds.length === 0) {
      this.logger.warn("No cart item IDs provided for deletion");

      throw new UnsuccessfulException("No cart item IDs provided for deletion");
    }

    // Check if the cart items exist in the database
    const isCartItemsAvailable = await this.cartsRepository.findBy({
      cartDetailsId: In(cartItemIds),
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
    });

    if (isCartItemsAvailable.length !== cartItemIds.length) {
      // If the number of found items is less than the number of IDs provided, some items might not exist
      this.logger.warn(`Some cart items were not found. Provided IDs: ${cartItemIds.length}, Found IDs: ${isCartItemsAvailable.length}`);

      throw new NotFoundException("Some cart items were not found");
    }

    // Proceed to delete the cart items
    const deleteResult = await this.cartsRepository.delete(cartItemIds);

    if (deleteResult.affected && deleteResult.affected > 0) {
      this.logger.log(`Successfully deleted ${deleteResult.affected} cart items.`);

      throw new SuccessException(`${deleteResult.affected} cart items deleted successfully`);
    } else {
      this.logger.warn("No cart items were deleted");

      throw new NotFoundException("No cart items were deleted");
    }
  }
}
