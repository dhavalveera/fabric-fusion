import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";

// TypeORM
import { Repository } from "typeorm";

// Custom Exception Filter
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// ENUM
import { CUSTOMER_CACHE_KEYS } from "src/constants/cache-keys";

// DTO (Data Transfer Object)
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

// Model
import { WishlistModel } from "./entities/wishlist.entity";

@Injectable()
export class WishlistService {
  private readonly logger = new Logger(WishlistService.name);

  constructor(
    @InjectRepository(WishlistModel) private readonly wishlistRepository: Repository<WishlistModel>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, @UserInRequest() userInfo: UserType) {
    const createdWishlistData = this.wishlistRepository.create({
      productDetailsFk: { productDetailsId: createWishlistDto.productDetailsFk },
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
    });

    const insertedData = await this.wishlistRepository.save(createdWishlistData);

    if (insertedData) {
      this.logger.log(`Added Product successfully to the Wishlist.`);

      this.eventEmitter.emit(CUSTOMER_CACHE_KEYS.LOVED_PRODS);

      throw new SuccessException(`Added Product successfully to the Wishlist.`);
    } else {
      this.logger.warn("Unable to process right now, please try again later");

      throw new UnsuccessfulException();
    }
  }

  async findAll(@UserInRequest() userInfo: UserType): Promise<{ rows: WishlistModel[]; count: number }> {
    // const [rows, count] = await this.wishlistRepository.findAndCount({where: {isDeleted: false}})
    const [rows, count] = await this.wishlistRepository
      .createQueryBuilder("wishlist")
      .leftJoinAndSelect("wishlist.productDetailsFk", "products")
      .leftJoinAndSelect("products.productImagesFk", "productImages", "productImages.isDeleted = :isDeleted OR productImages.isDeleted IS NULL", { isDeleted: false })
      .where("wishlist.customerDetailsFk = :customerDetailsFk", { customerDetailsFk: userInfo.customerDetailsId })
      .andWhere("wishlist.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("products.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("products.createdAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Products in Wishlist.`);

      return { count, rows };
    } else {
      this.logger.warn("No Wishlist Items Found.");

      throw new NotFoundException("No Wishlist Items Found!. Please add Products to Wishlist.");
    }
  }

  async remove(id: string, @UserInRequest() userInfo: UserType) {
    const isWishlistAvailable = await this.wishlistRepository.findOne({ where: { wishlistId: id, isDeleted: false, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } } });

    if (isWishlistAvailable) {
      const updatedData = await this.wishlistRepository.update({ wishlistId: id, isDeleted: false }, { isDeleted: true, removedOn: new Date() });

      if (updatedData) {
        this.logger.log(`Item Removed from Wishlist Successfully with ID - (${id})`);

        this.eventEmitter.emit(CUSTOMER_CACHE_KEYS.LOVED_PRODS);

        throw new SuccessException();
      } else {
        this.logger.warn("Unable to process right now, please try again later");

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Wishlist Item Found with ID - ${id}`);

      throw new NotFoundException();
    }
  }
}
