import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Custom Exceptions
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";

// DTO (Data Transfer Object)
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";

// Model
import { ProductCategoryModel } from "./entities/product-category.entity";

@Injectable()
export class ProductCategoryService {
  constructor(@InjectRepository(ProductCategoryModel) private readonly productCategRepository: Repository<ProductCategoryModel>) {}
  private readonly logger = new Logger("ProductCategory");

  async create(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategoryModel> {
    const insertedData = await this.productCategRepository.save(createProductCategoryDto);

    if (insertedData) {
      this.logger.log(`${insertedData.productCategoryName} - inserted in Database successfully!.`);

      return insertedData;
    } else {
      throw new UnsuccessfulException();
    }
  }

  async findAll(): Promise<{ rows: ProductCategoryModel[]; count: number }> {
    const [rows, count] = await this.productCategRepository.findAndCount({ where: { isDeleted: false }, order: { createdAt: "DESC" } });

    if (count > 0) {
      this.logger.log(`Found Total ${count} Categories`);

      return { rows, count };
    } else {
      throw new UnsuccessfulException();
    }
  }

  async findOne(id: string): Promise<ProductCategoryModel> {
    const productCategoryData = await this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (productCategoryData) {
      this.logger.log(`Found ${productCategoryData.productCategoryName}`);

      return productCategoryData;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    const isProductCategoryAvailable = this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      const updatedData = await this.productCategRepository.update({ productCategoryId: id }, updateProductCategoryDto);

      if (updatedData) {
        this.logger.log(`Updated Product Category Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.log("Unable to process right now, please try again later");

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`${id} -> Not Found in Database`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isProductCategoryAvailable = this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      const updatedData = await this.productCategRepository.update({ productCategoryId: id }, { isDeleted: true });

      if (updatedData) {
        this.logger.log(`Updated Product Category Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.log("Unable to process right now, please try again later");

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`${id} -> Not Found in Database`);

      throw new NotFoundException();
    }
  }
}
