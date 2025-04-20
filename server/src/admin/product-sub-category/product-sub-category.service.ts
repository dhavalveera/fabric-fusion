import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// ENUM
import { ADMIN_CACHE_KEYS } from "src/constants/cache-keys";

// DTO (Data Transfer Object)
import { CreateProductSubCategoryDto } from "./dto/create-product-sub-category.dto";
import { UpdateProductSubCategoryDto } from "./dto/update-product-sub-category.dto";

// Model
import { ProductCategoryModel } from "../product-category/entities/product-category.entity";
import { ProductSubCategoryModel } from "./entities/product-sub-category.entity";

@Injectable()
export class ProductSubCategoryService {
  private categoryRespository: Repository<ProductCategoryModel>;

  constructor(
    @InjectRepository(ProductSubCategoryModel) private readonly subCategRepository: Repository<ProductSubCategoryModel>,
    private dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.categoryRespository = this.dataSource.getRepository(ProductCategoryModel);
  }
  private readonly logger = new Logger("AdminProductSubCategory");

  async create(id: string, createProductSubCategoryDto: CreateProductSubCategoryDto): Promise<ProductSubCategoryModel> {
    const isProductCategoryAvailable = await this.categoryRespository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      const productSubCateg = new ProductSubCategoryModel();

      productSubCateg.productSubCategoryName = createProductSubCategoryDto.productSubCategoryName;
      productSubCateg.productSubCategoryImage = createProductSubCategoryDto.productSubCategoryImage;
      productSubCateg.productCategoryFk = isProductCategoryAvailable;

      const insertedData = await this.subCategRepository.save(productSubCateg);

      if (insertedData) {
        this.logger.log(`Inserted ${createProductSubCategoryDto.productSubCategoryName} Successfully!.`);

        this.eventEmitter.emit(ADMIN_CACHE_KEYS.SUB_CATEGORY);

        return insertedData;
      } else {
        throw new UnsuccessfulException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  async findAll(id: string): Promise<{ rows: ProductSubCategoryModel[]; count: number }> {
    const isProductCategoryAvailable = await this.categoryRespository.findOneBy({ productCategoryId: id, isDeleted: false });

    if (isProductCategoryAvailable) {
      const [rows, count] = await this.subCategRepository.findAndCount({ where: { productCategoryFk: { productCategoryId: id } }, order: { createdAt: "DESC" } });

      if (count > 0) {
        this.logger.log(`Found total - ${count} Product Sub Category`);

        return { rows, count };
      } else {
        throw new UnsuccessfulException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<ProductSubCategoryModel> {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      this.logger.log(`Found ${JSON.stringify(isSubCategoryAvailable)}`);

      return isSubCategoryAvailable;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateProductSubCategoryDto: UpdateProductSubCategoryDto) {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      if (updateProductSubCategoryDto.productSubCategoryName) {
        isSubCategoryAvailable.productSubCategoryName = updateProductSubCategoryDto.productSubCategoryName;
      } else if (updateProductSubCategoryDto.productSubCategoryImage) {
        isSubCategoryAvailable.productSubCategoryImage = updateProductSubCategoryDto.productSubCategoryImage;
      }

      const updatedData = await this.subCategRepository.update({ productSubCategoryId: id }, isSubCategoryAvailable);

      if (updatedData) {
        this.eventEmitter.emit(ADMIN_CACHE_KEYS.SUB_CATEGORY);

        throw new SuccessException();
      } else {
        throw new UnsuccessfulException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      const deletedRecord = await this.subCategRepository.update({ productSubCategoryId: id }, { isDeleted: true });

      if (deletedRecord) {
        this.logger.log(`${isSubCategoryAvailable.productSubCategoryName} - isDeleted is Successfully to True`);

        throw new SuccessException();
      } else {
        throw new UnsuccessfulException();
      }
    } else {
      throw new NotFoundException();
    }
  }
}
