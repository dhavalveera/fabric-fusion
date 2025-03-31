import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

// Types
import { UserType } from "src/all-types";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Model
import { ProductsModel } from "src/admin/products/entities/product.entity";
import { RecentlyViewedProductsModel } from "./entities/recently-viewed.entity";

// DTO
import { CreateRecentlyViewedDto } from "./dto/create-recently-viewed.dto";

@Injectable()
export class RecentlyViewedService {
  private readonly logger = new Logger(`Customer${RecentlyViewedService.name}`);

  private readonly productsTableRepoistory: Repository<ProductsModel>;

  constructor(
    @InjectRepository(RecentlyViewedProductsModel) private readonly recentlyViewProdRepo: Repository<RecentlyViewedProductsModel>,
    private readonly dataSource: DataSource,
  ) {
    this.productsTableRepoistory = this.dataSource.getRepository(ProductsModel);
  }

  async create(createRecentlyViewedDto: CreateRecentlyViewedDto, userInfo: UserType) {
    const isProductAvailable = await this.productsTableRepoistory.findOne({ where: { productDetailsId: createRecentlyViewedDto.productDetailsFk, isDeleted: false } });

    if (isProductAvailable) {
      this.logger.log(`Product (${isProductAvailable.productName}) Found!.`);

      const isProductAlreadyAvailable = await this.recentlyViewProdRepo.findOne({
        where: {
          customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
          productDetailsFk: { productDetailsId: createRecentlyViewedDto.productDetailsFk },
          isDeleted: false,
        },
      });

      if (isProductAlreadyAvailable) {
        const updateRecentlyViewedProd = await this.recentlyViewProdRepo.update(
          {
            customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
            productDetailsFk: { productDetailsId: createRecentlyViewedDto.productDetailsFk },
          },
          { viewedAt: new Date() },
        );

        if (updateRecentlyViewedProd.affected > 0) {
          this.logger.log(`Updated added Product to Recent Viewed for Customer/User - (${userInfo.name})`);

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to add Product to the Recently Viewed Products.`);

          throw new UnsuccessfulException(`Unable to add Product to the Recently Viewed Products.`);
        }
      } else {
        const createdRecentlyViewedProd = this.recentlyViewProdRepo.create({
          customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
          productDetailsFk: { productDetailsId: createRecentlyViewedDto.productDetailsFk },
        });

        const savedData = await this.recentlyViewProdRepo.save(createdRecentlyViewedProd);

        if (savedData) {
          this.logger.log(`Successfully added Product to Recent Viewed for Customer/User - (${userInfo.name})`);

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to add Product to the Recently Viewed Products.`);

          throw new UnsuccessfulException(`Unable to add Product to the Recently Viewed Products.`);
        }
      }
    } else {
      this.logger.error(`No Product Found with Product ID - ${createRecentlyViewedDto.productDetailsFk}. Please check ID again.`);

      throw new NotFoundException(`No Product Found with Product ID - ${createRecentlyViewedDto.productDetailsFk}. Please check ID again.`);
    }
  }

  async findAll(userInfo: UserType): Promise<{ count: number; rows: RecentlyViewedProductsModel[] }> {
    const [rows, count] = await this.recentlyViewProdRepo
      .createQueryBuilder("rRP")
      .leftJoinAndSelect("rRP.productDetailsFk", "pD")
      .select([
        "rRP.isDeleted",
        "rRP.createdAt",
        "rRP.updatedAt",
        "rRP.recentlyViewedProductId",
        "rRP.viewedAt",
        "pD.productName",
        "pD.productDisplayImage",
        "pD.productPrice",
        "pD.productDetailsId",
        "pD.productSlug",
      ])
      .where("rRP.customerDetailsFk.customerDetailsId = :customerDetailsId", { customerDetailsId: userInfo.customerDetailsId })
      .andWhere("rRP.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("rRP.viewedAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Recently Viewed by the Customer/User - (${userInfo.name})`);

      return { count, rows };
    } else {
      this.logger.warn(`No Products were found in Recently Viewed Products.`);

      throw new UnsuccessfulException();
    }
  }

  async remove(userInfo: UserType) {
    const isRecentlyReviewedProdAvailable = await this.recentlyViewProdRepo.find({ where: { customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } } });

    if (isRecentlyReviewedProdAvailable.length > 0) {
      const deletedRecentlyViewedProd = await this.recentlyViewProdRepo.delete({ customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } });

      if (deletedRecentlyViewedProd.affected > 0) {
        this.logger.log(`Deleted Total ${deletedRecentlyViewedProd.affected} Recently Viewed Products for Customer/User - (${userInfo.name})`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Clear the Recently Viewed Products. Please try again later.`);

        throw new UnsuccessfulException(`Unable to Clear the Recently Viewed Products. Please try again later.`);
      }
    } else {
      this.logger.warn(`No Recently Viewed Products Found for Customer/User - (${userInfo.name})`);

      throw new UnsuccessfulException();
    }
  }
}
