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

// Model
import { ProductReviewModel } from "./entities/product-review.entity";

@Injectable()
export class ProductReviewsService {
  private readonly logger = new Logger(ProductReviewsService.name);

  constructor(@InjectRepository(ProductReviewModel) private readonly productReviewRepoistory: Repository<ProductReviewModel>) {}

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
}
