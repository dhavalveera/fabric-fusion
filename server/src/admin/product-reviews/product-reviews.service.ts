import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Model
import { ProductReviewModel } from "src/customer/product-reviews/entities/product-review.entity";

// Custom Exception Filters
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

@Injectable()
export class ProductReviewsService {
  private readonly logger = new Logger("AdminProductReviewsService");

  private readonly prodReviewRepository: Repository<ProductReviewModel>;

  constructor(private readonly dataSource: DataSource) {
    this.prodReviewRepository = this.dataSource.getRepository(ProductReviewModel);
  }

  async findAll(pageNumber: string, pageSize: string): Promise<{ count: number; rows: ProductReviewModel[] }> {
    const [rows, count] = await this.prodReviewRepository
      .createQueryBuilder("productReviews")
      .leftJoinAndSelect("productReviews.productDetailsFk", "productDetails")
      .leftJoinAndSelect("productReviews.customerDetailsFk", "customerDetails")
      .select([
        "productReviews.productReviewsId",
        "productReviews.ratingStar",
        "productReviews.ratingComment",
        "productReviews.isDeleted",
        "productReviews.createdAt",
        "productReviews.updatedAt",
        "customerDetails.customerDetailsId",
        "customerDetails.firstName",
        "customerDetails.lastName",
        "productDetails.productName",
      ])
      .andWhere("productReviews.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("productReviews.createdAt", "DESC")
      .take(Number(pageSize))
      .skip(Number(pageSize) * Number(pageNumber))
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Product Reviews.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Product Reviews Found.`);

      throw new UnsuccessfulException(`No Product Reviews Found.`);
    }
  }
}
