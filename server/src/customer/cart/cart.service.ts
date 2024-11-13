import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { In, Repository } from "typeorm";

// Custom Exceptions
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Type
import { UserType } from "src/all-types";

// Model
import { CartsModel } from "./entities/cart.entity";

// DTO (Data Transfer Object)
import { CreateCartDto } from "./dto/create-cart.dto";
import { DeleteCartDto } from "./dto/delete-cart.dto";

// CONSTANT
import { CartStatus } from "./constants";

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(@InjectRepository(CartsModel) private readonly cartsRepository: Repository<CartsModel>) {}

  async create(createCartDto: CreateCartDto, userInfo: UserType) {
    const createdCart = this.cartsRepository.create({
      ...createCartDto,
      addedAt: new Date(),
      productDetailsFk: { productDetailsId: createCartDto.productDetailsFk },
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
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

  async findAll(userInfo: UserType): Promise<{ rows: CartsModel[]; count: number }> {
    const [rows, count] = await this.cartsRepository.findAndCount({
      where: { customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false, cartStatus: CartStatus.Active },
    });

    if (count > 0) {
      this.logger.log(`Found total ${count} Products in Cart for Customer - ${userInfo.name}`);

      return { count, rows };
    } else {
      this.logger.error("Unable to find any Products in the Cart");

      throw new UnsuccessfulException();
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
