import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Custom Exception Filters
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { ProductsModel } from "src/admin/products/entities/product.entity";

// Types
import { SearchProductType } from "./types";

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  private readonly productsRepository: Repository<ProductsModel>;

  constructor(private readonly dataSource: DataSource) {
    this.productsRepository = this.dataSource.getRepository(ProductsModel);
  }

  async searchProduct(query: string): Promise<{ rows: SearchProductType[]; count: number }> {
    const [rows, count] = await this.productsRepository
      .createQueryBuilder("pD")
      .select(["pD.productDetailsId", "pD.productName", "pD.productDescription", "pD.brandName", "pD.productPrice", "pD.productDisplayImage", "pC.productCategoryName", "pSC.productSubCategoryName"])
      .leftJoinAndSelect("pD.productSubCategoryFk", "pSC")
      .leftJoinAndSelect("pSC.productCategoryFk", "pC")
      .where("pD.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere(`to_tsvector(concat_ws(' ', pD.productName, pD.productDescription, pD.brandName)) @@ phraseto_tsquery(:query)::tsquery`, {
        query: `${query}:*`,
      })
      .orderBy("pD.createdAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Products Searched for.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Products found you are searching for.`);

      throw new UnsuccessfulException(`No Products found you are searching for.`);
    }
  }
}
