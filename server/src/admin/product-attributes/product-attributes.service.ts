import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { ProductSubCategoryModel } from "../product-sub-category/entities/product-sub-category.entity";
import { ProductAttributeModel } from "./entities/product-attribute.entity";

// DTO (Data Transfer Object)
import { CreateProductAttributeDto } from "./dto/create-product-attribute.dto";
import { UpdateProductAttributeDto } from "./dto/update-product-attribute.dto";

@Injectable()
export class ProductAttributesService {
  private readonly logger = new Logger("AdminProductAttributes");
  private readonly productSubCategRepository: Repository<ProductSubCategoryModel>;

  constructor(
    @InjectRepository(ProductAttributeModel) private readonly productAttributeRepository: Repository<ProductAttributeModel>,
    private readonly dataSource: DataSource,
  ) {
    this.productSubCategRepository = this.dataSource.getRepository(ProductSubCategoryModel);
  }

  async create(id: string, createProductAttributeDto: CreateProductAttributeDto) {
    const isProdSubCategAvailable = await this.productSubCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isProdSubCategAvailable) {
      const insertPaylaod = this.productAttributeRepository.create({
        ...createProductAttributeDto,
        productSubCategoryFk: isProdSubCategAvailable,
      });

      const productAttributeData = await this.productAttributeRepository.save(insertPaylaod);

      if (productAttributeData) {
        this.logger.log(`Product Attribute with Name (${productAttributeData.productAttributeName}) with Value (${productAttributeData.productAttributeValue}) has been created successfully!`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to create Attribute with Name (${createProductAttributeDto.productAttributeName}) with Value (${createProductAttributeDto.productAttributeValue})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`Product Sub Category (${id}) for which you're adding Product Attributes, that Category is not available. Please check`);

      throw new NotFoundException(`Product Sub Category (${id}) for which you're adding Product Attributes, that Category is not available. Please check`);
    }
  }

  async findAll(id: string): Promise<{ rows: ProductAttributeModel[]; count: number }> {
    const isProdSubCategAvailable = await this.productSubCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isProdSubCategAvailable) {
      this.logger.log(`Product Sub Category Found - (${isProdSubCategAvailable.productSubCategoryName})`);

      const [rows, count] = await this.productAttributeRepository.findAndCount({
        where: { productSubCategoryFk: { productSubCategoryId: id }, isDeleted: false },
        order: { createdAt: "DESC" },
      });

      if (count > 0) {
        this.logger.log(`Found total ${count} Product Attributes.`);

        return { count, rows };
      } else {
        this.logger.warn(`No Product Attributes Found where total count is ${count}`);

        throw new NotFoundException();
      }
    } else {
      this.logger.error(`Product Sub Category (${id}) for which you're adding Product Attributes, that Category is not available. Please check`);

      throw new NotFoundException(`Product Sub Category (${id}) for which you're adding Product Attributes, that Category is not available. Please check`);
    }
  }

  async findOne(id: string): Promise<ProductAttributeModel> {
    const isProdAttributeAvailable = await this.productAttributeRepository.findOne({ where: { productAttributeId: id, isDeleted: false } });

    if (isProdAttributeAvailable) {
      this.logger.log(`Found Product Attribute with Name - (${isProdAttributeAvailable.productAttributeName}) and Value - (${isProdAttributeAvailable.productAttributeValue})`);

      return isProdAttributeAvailable;
    } else {
      this.logger.log(`No Attribute Found for ID - (${id})`);

      throw new NotFoundException();
    }
  }

  async update(id: string, updateProductAttributeDto: UpdateProductAttributeDto) {
    const isProdAttributeAvailable = await this.productAttributeRepository.findOne({ where: { productAttributeId: id, isDeleted: false } });

    if (isProdAttributeAvailable) {
      if (updateProductAttributeDto.updateSubCategory) {
        const newSubCategData = await this.productSubCategRepository.findOne({ where: { productSubCategoryId: updateProductAttributeDto.subCategoryId, isDeleted: false } });

        if (newSubCategData) {
          this.logger.log(`New Product Sub Category Found with Name - ${newSubCategData.productSubCategoryName}`);

          isProdAttributeAvailable.productSubCategoryFk = newSubCategData;
        } else {
          this.logger.error(`Product Sub Category ID - (${updateProductAttributeDto.subCategoryId}) is not available. Please re-check`);

          throw new NotFoundException(`Product Sub Category ID - (${updateProductAttributeDto.subCategoryId}) is not available. Please re-check`);
        }
      }

      isProdAttributeAvailable.productAttributeName = updateProductAttributeDto.productAttributeName;
      isProdAttributeAvailable.productAttributeValue = updateProductAttributeDto.productAttributeValue;

      const updatedData = await this.productAttributeRepository.save(isProdAttributeAvailable);

      if (updatedData) {
        this.logger.log(`Successfully Updated Attribute - ${updatedData.productAttributeName}`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to update Attribute - (${updateProductAttributeDto.productAttributeName})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Attributes Found!.`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isProdAttributeAvailable = await this.productAttributeRepository.findOne({ where: { productAttributeId: id, isDeleted: false } });

    if (isProdAttributeAvailable) {
      const updatedData = await this.productAttributeRepository.update({ productAttributeId: id, isDeleted: false }, { isDeleted: true });

      if (updatedData) {
        this.logger.log(`Successfully deleted (isDeleted: false) for Product Attribute - (${isProdAttributeAvailable.productAttributeName})`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to delete Attribute - (${isProdAttributeAvailable.productAttributeName})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Attributes Found!.`);

      throw new NotFoundException();
    }
  }
}
