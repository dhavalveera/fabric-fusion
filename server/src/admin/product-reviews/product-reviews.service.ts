import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Model
import { ProductReviewModel } from "src/customer/product-reviews/entities/product-review.entity";
import { ReviewsReportedModel } from "src/customer/product-reviews/entities/reviews-reported.entity";

// Custom Exception Filters
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";

// Types
import { StatusType } from "./types";

@Injectable()
export class ProductReviewsService {
  private readonly logger = new Logger("AdminProductReviewsService");

  private readonly prodReviewRepository: Repository<ProductReviewModel>;
  private readonly reviewsReportedRepository: Repository<ReviewsReportedModel>;

  constructor(private readonly dataSource: DataSource) {
    this.reviewsReportedRepository = this.dataSource.getRepository(ReviewsReportedModel);
    this.prodReviewRepository = this.dataSource.getRepository(ProductReviewModel);
  }

  async findAll(statusType: StatusType): Promise<{ count: number; rows: ReviewsReportedModel[] }> {
    const [rows, count] = await this.reviewsReportedRepository
      .createQueryBuilder("reviewsReported")
      .leftJoinAndSelect("reviewsReported.reportedByUserId", "reportedUser")
      .leftJoinAndSelect("reviewsReported.productReviewFk", "productReview")
      .select([
        "reviewsReported.reviewsReportedId",
        "reviewsReported.reportStatus",
        "reviewsReported.createdAt",
        "productReview.ratingStar",
        "productReview.ratingTitle",
        "reportedUser.customerDetailsId",
        "reportedUser.firstName",
        "reportedUser.lastName",
      ])
      .where("reviewsReported.reportStatus = :reportStatus", { reportStatus: statusType })
      .andWhere("reviewsReported.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("reviewsReported.createdAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Reported Reviews for Status - (${statusType})`);

      return { count, rows };
    } else {
      this.logger.warn(`No Reported Reviews for Status - (${statusType || "No Status Found"}).`);

      throw new UnsuccessfulException(`No Reported Reviews for Status - (${statusType || "No Status Found"}).`);
    }
  }

  async findOne(id: string): Promise<ReviewsReportedModel> {
    const isReviewsReportedAvailable = await this.reviewsReportedRepository
      .createQueryBuilder("reviewsReported")
      .leftJoinAndSelect("reviewsReported.reportedByUserId", "reportByUser")
      .leftJoinAndSelect("reviewsReported.productReviewFk", "productReview")
      .select([
        "reviewsReported.reviewsReportedId",
        "reviewsReported.reason",
        "reviewsReported.reportStatus",
        "reviewsReported.createdAt",
        "productReview.productReviewsId",
        "productReview.ratingStar",
        "productReview.ratingTitle",
        "productReview.ratingComment",
        "reportByUser.customerDetailsId",
        "reportByUser.firstName",
        "reportByUser.lastName",
      ])
      .where("reviewsReported.reviewsReportedId = :reviewsReportedId", { reviewsReportedId: id })
      .andWhere("reviewsReported.isDeleted = :isDeleted", { isDeleted: false })
      .getOne();

    if (isReviewsReportedAvailable) {
      return isReviewsReportedAvailable;
    } else {
      this.logger.error(`No Reported Review Found for Review ID - (${id})`);

      throw new NotFoundException(`No Reported Review Found for Review ID - (${id})`);
    }
  }

  async update(id: string, updateProductReviewDto: UpdateProductReviewDto) {
    const isReviewsReportedAvailable = await this.reviewsReportedRepository
      .createQueryBuilder("reviewsReported")
      .leftJoinAndSelect("reviewsReported.reportedByUserId", "reportByUser")
      .leftJoinAndSelect("reviewsReported.productReviewFk", "productReview")
      .select([
        "reviewsReported.reviewsReportedId",
        "reviewsReported.reason",
        "reviewsReported.reportStatus",
        "reviewsReported.createdAt",
        "productReview.productReviewsId",
        "productReview.ratingStar",
        "productReview.ratingTitle",
        "productReview.ratingComment",
        "reportByUser.customerDetailsId",
        "reportByUser.firstName",
        "reportByUser.lastName",
      ])
      .where("reviewsReported.reviewsReportedId = :reviewsReportedId", { reviewsReportedId: id })
      .andWhere("reviewsReported.isDeleted = :isDeleted", { isDeleted: false })
      .getOne();

    if (isReviewsReportedAvailable) {
      const validTransitions: Record<string, Array<string>> = {
        Pending: ["Reviewed"], // can only move forward
        Reviewed: ["Action Taken"], // cannot go back to Pending, just move forward
        "Action Taken": [], // Final State, no further transition
      };

      if (updateProductReviewDto.status === isReviewsReportedAvailable.reportStatus) {
        this.logger.log(`No change in status (${updateProductReviewDto.status}). Skipping transition validation.`);

        throw new UnsuccessfulException(`No change in status (${updateProductReviewDto.status}). Skipping transition validation.`);
      } else if (!validTransitions[isReviewsReportedAvailable.reportStatus].includes(updateProductReviewDto.status)) {
        this.logger.error(`Transition from ${isReviewsReportedAvailable.reportStatus} to ${updateProductReviewDto.status} is not allowed!.`);

        throw new UnsuccessfulException(`Transition from ${isReviewsReportedAvailable.reportStatus} to ${updateProductReviewDto.status} is not allowed!.`);
      } else {
        // Handle `softDelete` or `permanentDelete` Actions
        if (["softDelete", "permanentDelete"].includes(updateProductReviewDto.reviewAction)) {
          if (isReviewsReportedAvailable.reportStatus !== "Reviewed") {
            // Ensure Deletion Actions are Allowed only if `Reviewed` Status
            this.logger.error(`Action (${updateProductReviewDto.reviewAction}) can only be performed in Reviewed status!`);

            throw new UnsuccessfulException(`Action (${updateProductReviewDto.reviewAction}) can only be performed in Reviewed status!`);
          }

          // Perform Deletion Action
          if (updateProductReviewDto.reviewAction === "softDelete") {
            // Soft Delete Logic
            await this.prodReviewRepository.update({ productReviewsId: isReviewsReportedAvailable.productReviewFk.productReviewsId }, { isDeleted: true });

            this.logger.log(`Soft Delete performed for Review ID - (${id})`);
          } else if (updateProductReviewDto.reviewAction === "permanentDelete") {
            // Permanent Delete Logic
            await this.prodReviewRepository.delete({ productReviewsId: isReviewsReportedAvailable.productReviewFk.productReviewsId });

            this.logger.log(`Permanent Delete performed for Review ID - (${isReviewsReportedAvailable.productReviewFk})`);
          }
        }

        const updatedReportedReview = await this.reviewsReportedRepository.update({ reviewsReportedId: id, isDeleted: false }, { reportStatus: updateProductReviewDto.status });

        if (updatedReportedReview) {
          this.logger.log(`Successfully Updated the Reported Review!.`);

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to Update the New Status (${updateProductReviewDto.status}) for the Reported Review.`);

          throw new UnsuccessfulException(`Unable to Update the New Status (${updateProductReviewDto.status}) for the Reported Review.`);
        }
      }
    } else {
      this.logger.error(`No Reported Review Found for Review ID - (${id})`);

      throw new NotFoundException(`No Reported Review Found for Review ID - (${id})`);
    }
  }
}
