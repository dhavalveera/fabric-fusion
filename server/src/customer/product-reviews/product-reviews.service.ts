import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// Custom Exception Filter
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { ReportReviewDto } from "./dto/report-review.dto";

// Model
import { ProductReviewModel } from "./entities/product-review.entity";
import { ReviewsReportedModel } from "./entities/reviews-reported.entity";

@Injectable()
export class ProductReviewsService {
  private readonly logger = new Logger(ProductReviewsService.name);

  constructor(
    @InjectRepository(ProductReviewModel) private readonly productReviewRepoistory: Repository<ProductReviewModel>,
    @InjectRepository(ReviewsReportedModel) private readonly reviewsReportedRepository: Repository<ReviewsReportedModel>,
  ) {}

  async create(createProductReviewDto: CreateProductReviewDto, @UserInRequest() userInfo: UserType) {
    const createProdReview = this.productReviewRepoistory.create({
      ...createProductReviewDto,
      productDetailsFk: { productDetailsId: createProductReviewDto.productDetailsFk },
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
    });

    const prodReviewData = await this.productReviewRepoistory.save(createProdReview);

    if (prodReviewData) {
      this.logger.log(`Created Product Review for Product ID - (${createProdReview.productDetailsFk}) for Customer/User - (${userInfo.name})`);

      throw new SuccessException();
    } else {
      this.logger.log(`Unable to create Product Reviews for Product ID - (${createProdReview.productDetailsFk.productDetailsId}) for Customer/User - (${userInfo.name})`);

      throw new UnsuccessfulException();
    }
  }

  async findAll(productId: string): Promise<{ rows: ProductReviewModel[]; count: number }> {
    const [rows, count] = await this.productReviewRepoistory.findAndCount({
      where: {
        productDetailsFk: { productDetailsId: productId },
        isDeleted: false,
      },
    });

    if (count > 0) {
      this.logger.log(`Found total ${count} Reviews for Product with ID - (${productId})`);

      return { count, rows };
    } else {
      this.logger.warn(`No Product Reviews found for Product with ID - ${productId}`);

      throw new UnsuccessfulException();
    }
  }

  async getAllReviewsOfCustomer(@UserInRequest() userInfo: UserType): Promise<{ rows: ProductReviewModel[]; count: number }> {
    console.log("userInfo.customerDetailsId", userInfo.customerDetailsId);

    const [rows, count] = await this.productReviewRepoistory
      .createQueryBuilder("pR")
      .leftJoinAndSelect("pR.productDetailsFk", "pD")
      .select(["pR.productReviewsId", "pR.ratingStar", "pR.ratingComment", "pR.isDeleted", "pR.createdAt", "pR.updatedAt", "pD.productDetailsId", "pD.productName", "pD.productDisplayImage"])
      .orderBy("pR.createdAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Product Reviews for Customer/User - (${userInfo.name})`);

      return { count, rows };
    } else {
      this.logger.error(`No Product Reviews Found for Customer/User - (${userInfo.name})`);

      throw new UnsuccessfulException(`No Product Reviews Found`);
    }
  }

  async update(id: string, updateProductReviewDto: UpdateProductReviewDto, @UserInRequest() userInfo: UserType) {
    const isProductReviewAvailable = await this.productReviewRepoistory.findOne({
      where: { productReviewsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false },
    });

    if (isProductReviewAvailable) {
      const updatedProdReview = this.productReviewRepoistory.update({ productReviewsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } }, updateProductReviewDto);

      if (updatedProdReview) {
        this.logger.log(`Successfully Updated the Product Review for Product ID - ${isProductReviewAvailable.productDetailsFk} for Customer/User - (${userInfo.name})`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Update the Product Review for Product ID - ${isProductReviewAvailable.productDetailsFk} for Customer/User - (${userInfo.name})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Reviews Found!.`);

      throw new NotFoundException(`No Product Reviews Found!.`);
    }
  }

  async remove(id: string, @UserInRequest() userInfo: UserType) {
    const isProductReviewAvailable = await this.productReviewRepoistory.findOne({
      where: { productReviewsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false },
    });

    if (isProductReviewAvailable) {
      const deletedProdReview = this.productReviewRepoistory.update({ productReviewsId: id, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } }, { isDeleted: true });

      if (deletedProdReview) {
        this.logger.log(`Successfully Deleted the Product Review for Product ID - ${isProductReviewAvailable.productDetailsFk} for Customer/User - (${userInfo.name})`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Delete the Product Review for Product ID - ${isProductReviewAvailable.productDetailsFk} for Customer/User - (${userInfo.name})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Reviews Found!.`);

      throw new NotFoundException(`No Product Reviews Found!.`);
    }
  }

  async reportReview(reportReviewBody: ReportReviewDto, @UserInRequest() userInfo: UserType) {
    const isProductReviewAvailable = await this.productReviewRepoistory.findOne({
      where: { productReviewsId: reportReviewBody.productReviewFk, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false },
    });

    if (isProductReviewAvailable) {
      const createdReportReview = this.reviewsReportedRepository.create({
        reason: reportReviewBody.reason,
        reportedByUserId: { customerDetailsId: userInfo.customerDetailsId },
        productReviewFk: { productReviewsId: reportReviewBody.productReviewFk },
      });

      const reportedReviewData = await this.reviewsReportedRepository.save(createdReportReview);

      if (reportedReviewData) {
        this.logger.log(`Reported Review Successfully!..`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Save the Reported Review for Product ID - ${reportReviewBody.productReviewFk} for Customer/User - (${userInfo.name})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Reviews Found!.`);

      throw new NotFoundException(`No Product Reviews Found!.`);
    }
  }
}
