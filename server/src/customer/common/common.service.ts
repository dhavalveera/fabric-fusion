import { Inject, Injectable, Logger } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Cache
import { Cache } from "cache-manager";

// Custom Exception Filters
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { AdsModel } from "src/admin/ads/entities/ad.entity";
import { ProductCategoryModel } from "src/admin/product-category/entities/product-category.entity";
import { ProductSubCategoryModel } from "src/admin/product-sub-category/entities/product-sub-category.entity";
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Injectable()
export class CommonService {
  private readonly logger = new Logger("CustomerCommonService");

  private readonly adsRepository: Repository<AdsModel>;
  private readonly productCategRepository: Repository<ProductCategoryModel>;
  private readonly productSubCategRepository: Repository<ProductSubCategoryModel>;
  private readonly productsRepository: Repository<ProductsModel>;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dataSource: DataSource,
  ) {
    this.adsRepository = this.dataSource.getRepository(AdsModel);
    this.productCategRepository = this.dataSource.getRepository(ProductCategoryModel);
    this.productSubCategRepository = this.dataSource.getRepository(ProductSubCategoryModel);
    this.productsRepository = this.dataSource.getRepository(ProductsModel);
  }

  async getAllAdsService(): Promise<{ rows: AdsModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commonAllAds");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 43, returned All Ads from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.adsRepository.findAndCount({ where: { isDeleted: false } });

      if (count > 0) {
        this.logger.log(`Found total ${count} Ads`);

        this.logger.log(`Line # 53, returning Value from DB`);

        await this.cacheManager.set("commonAllAds", JSON.stringify({ count, rows }), 0);

        this.logger.log(`Stored the DB Value (All Ads) to Cache`);

        return { count, rows };
      } else {
        this.logger.error("Unable to find any Ads");

        throw new UnsuccessfulException();
      }
    }
  }

  async getAllCategoryService(): Promise<{ rows: ProductCategoryModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get(`commonAllCategory`);

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 71, returned All Categories from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.productCategRepository.findAndCount({ where: { isDeleted: false } });

      if (count > 0) {
        this.logger.log(`Found total ${count} Product Category`);

        this.logger.log(`Line # 80, returning Value from DB`);

        await this.cacheManager.set("commonAllCategory", JSON.stringify({ count, rows }), 0);

        this.logger.log(`Stored the DB Value (All Category) to Cache`);

        return { count, rows };
      } else {
        this.logger.error("Unable to find any Product Categories");

        throw new UnsuccessfulException();
      }
    }
  }

  async getAllSubCategoryService(id: string): Promise<{ rows: ProductSubCategoryModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commongetAllSubCateg");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 99, returned ALl Sub Categories from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const isProductCategAvailable = await this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

      if (isProductCategAvailable) {
        this.logger.log(`Found Product Category -- (${isProductCategAvailable.productCategoryName})`);

        const [rows, count] = await this.productSubCategRepository.findAndCount({ where: { productCategoryFk: { productCategoryId: id }, isDeleted: false } });

        if (count > 0) {
          this.logger.log(`Found total ${count} Product Sub Category`);

          this.logger.log(`Line # 113, returning Value from DB`);

          await this.cacheManager.set("commongetAllSubCateg", JSON.stringify({ count, rows }), 0);

          this.logger.log(`Stored the DB Value (All Sub Categories) to Cache`);

          return { count, rows };
        } else {
          this.logger.error("Unable to find any Product Sub Categories");

          throw new UnsuccessfulException();
        }
      } else {
        this.logger.error(`No Product Category Found with ID - (${id})`);

        throw new NotFoundException(`No Product Category Found with ID - (${id})`);
      }
    }
  }

  async getSubCategDetailsService(id: string): Promise<ProductSubCategoryModel> {
    const cachedValue = await this.cacheManager.get("commonSubCategDetails");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 137, returned Sub Category Details from Cache.`);

      return JSON.parse(cachedValue);
    }

    const isProductSubCategAvail = await this.productSubCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isProductSubCategAvail) {
      this.logger.log(`Line # 145, returning Value from DB`);

      await this.cacheManager.set("commonSubCategDetails", JSON.stringify(isProductSubCategAvail), 0);

      this.logger.log(`Stored the DB Value (Sub Category Detail) to Cache`);

      return isProductSubCategAvail;
    } else {
      this.logger.error("Unable to find any Product Sub Categories");

      throw new UnsuccessfulException();
    }
  }

  async getProductsOfSubCategService(id: string): Promise<{ rows: ProductsModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commonProductsOfSubCateg");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 163, returned Products of Sub Category Details from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.productsRepository
        .createQueryBuilder("products")
        .leftJoinAndSelect("products.productSubCategoryFk", "productSubCategory")
        .leftJoinAndSelect("productSubCategory.productCategoryFk", "productCategory")
        .leftJoinAndSelect("products.sizes", "sizes")
        .leftJoinAndSelect("products.careInstructionsFk", "careInstruction")
        .leftJoinAndSelect("products.returnPolicyFk", "returnPolicy")
        .leftJoinAndSelect("products.productImagesFk", "productImages", "productImages.isDeleted = :isDeleted OR productImages.isDeleted IS NULL", { isDeleted: false })
        .where("productSubCategory.productSubCategoryId = :productSubCategoryId", { productSubCategoryId: id })
        .orderBy("products.createdAt", "DESC")
        .getManyAndCount();

      if (count > 0) {
        this.logger.log(`Found total ${count} Products under Sub Category with ID - (${id})`);

        this.logger.log(`Line # 183, returning Value from DB`);

        await this.cacheManager.set("commonProductsOfSubCateg", JSON.stringify({ count, rows }), 0);

        this.logger.log(`Stored the DB Value (Products of Sub Category) to Cache`);

        return { count, rows };
      } else {
        this.logger.error(`Unable to find any Products under Sub Category ID - (${id})`);

        throw new UnsuccessfulException();
      }
    }
  }

  async getNewestProducts(): Promise<{ rows: ProductsModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commonNewestProducts");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 201, returned Newest Products from Cache.`);

      return JSON.parse(cachedValue);
    }

    const [rows, count] = await this.productsRepository.findAndCount({ where: { isDeleted: false }, order: { createdAt: "DESC" } });

    if (count > 0) {
      this.logger.log(`Found total ${count} Newest Products`);

      this.logger.log(`Line # 211, returning Value from DB`);

      await this.cacheManager.set("commonNewestProducts", JSON.stringify({ count, rows }), 0);

      this.logger.log(`Stored the DB Value (Newest Products) to Cache`);

      return { count, rows };
    } else {
      this.logger.error(`Unable to find Newest Products`);

      throw new UnsuccessfulException();
    }
  }

  async getLowStockItemsService(): Promise<{ rows: ProductsModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commonLowStockItems");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 229, returned Low Stock Items from Cache.`);

      return JSON.parse(cachedValue);
    }

    const lowStockThreshold = 5;

    const [rows, count] = await this.productsRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.sizes", "productSize")
      .where("productSize.stockRemaining <= :lowStockThreshold", { lowStockThreshold })
      .select([
        "product.productDetailsId", // Add other product fields as needed
        "product.productName",
        "product.productPrice",
        "product.productDisplayImage",
        "productSize.size",
        "productSize.stockRemaining",
        "productSize.totalStock",
      ])
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Line # 252, returning Value from DB`);

      await this.cacheManager.set("commonLowStockItems", JSON.stringify({ count, rows }), 0);

      this.logger.log(`Stored the DB Value (Low Stock Items) to Cache`);

      return { count, rows };
    } else {
      this.logger.error(`Unable to find Low Stock Products with Low Stock Threshold limit to ${lowStockThreshold}`);

      throw new UnsuccessfulException(`Unable to find Low Stock Products with Low Stock Threshold limit to ${lowStockThreshold}`);
    }
  }

  async findMostLovedProductsService(): Promise<{ rows: ProductsModel[]; count: number }> {
    const cachedValue = await this.cacheManager.get("commonMostLovedProducts");

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 270, returned Most Loved Products from Cache.`);

      return JSON.parse(cachedValue);
    }

    const [rows, count] = await this.productsRepository
      .createQueryBuilder("product")
      .leftJoin("product.wishlistFk", "wishlist")
      .leftJoin("product.orderItemsFk", "orderItem")
      // .addSelect("COUNT(wishlist.wishlistId) as wishlistCount")
      // .addSelect("COUNT(orderItem.orderItemId) as orderCount")
      .where("product.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("wishlist.isDeleted = :isDeleted", { isDeleted: false })
      // .andWhere("orderItem.isDeleted = :isDeleted", { isDeleted: false })
      .groupBy("product.productDetailsId")
      .orderBy("COUNT(wishlist.wishlistId)", "DESC")
      .addOrderBy("COUNT(orderItem.orderItemId)", "DESC")
      .limit(10)
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Most Loved Products`);

      this.logger.log(`Line # 293, returning Value from DB`);

      await this.cacheManager.set("commonMostLovedProducts", JSON.stringify({ count, rows }), 0);

      this.logger.log(`Stored the DB Value (Most Loved Products) to Cache`);

      return { count, rows };
    } else {
      this.logger.warn(`Unable to find Most Loved Products`);

      throw new UnsuccessfulException(`Unable to find Most Loved Products`);
    }
  }
}
