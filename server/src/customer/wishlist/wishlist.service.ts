import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { Repository } from "typeorm";

// Custom Exception Filter
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO (Data Transfer Object)
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

// Model
import { WishlistModel } from "./entities/wishlist.entity";

@Injectable()
export class WishlistService {
  private readonly logger = new Logger(WishlistService.name);

  constructor(@InjectRepository(WishlistModel) private readonly wishlistRepository: Repository<WishlistModel>) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const createdWishlistData = this.wishlistRepository.create({
      productDetailsFk: { productDetailsId: createWishlistDto.productDetailsFk },
    });

    const insertedData = await this.wishlistRepository.save(createdWishlistData);

    if (insertedData) {
      this.logger.log(`Added Product successfully to the Wishlist.`);

      throw new SuccessException(`Added Product successfully to the Wishlist.`);
    } else {
      this.logger.warn("Unable to process right now, please try again later");

      throw new UnsuccessfulException();
    }
  }

  async findAll(): Promise<{ rows: WishlistModel[]; count: number }> {
    // const [rows, count] = await this.wishlistRepository.findAndCount({where: {isDeleted: false}})
    const [rows, count] = await this.wishlistRepository
      .createQueryBuilder("wishlist")
      .leftJoinAndSelect("wishlist.productDetailsFk", "products")
      .leftJoinAndSelect("products.productImagesFk", "productImages", "productImages.isDeleted = :isDeleted OR productImages.isDeleted IS NULL", { isDeleted: false })
      .where("wishlist.isDeleted = :isDeleted", { isDeleted: false })
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

  async remove(id: string) {
    const isWishlistAvailable = await this.wishlistRepository.findOne({ where: { wishlistId: id, isDeleted: false } });

    if (isWishlistAvailable) {
      const updatedData = await this.wishlistRepository.update({ wishlistId: id, isDeleted: false }, { isDeleted: true, removedOn: new Date() });

      if (updatedData) {
        this.logger.log(`Item Removed from Wishlist Successfully with ID - (${id})`);

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
