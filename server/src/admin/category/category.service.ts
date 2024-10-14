import { HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

// DTO - Data Transfer Object
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

// Model
import { ProductCategory } from "./models/category.model";

// Type
import { FindAllReturnType } from "./interface";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(ProductCategory) private readonly productCategRepository: typeof ProductCategory) {}
  private readonly logger = new Logger();

  create(createCategoryDto: CreateCategoryDto): Promise<ProductCategory> {
    const insertedCategory = new ProductCategory();

    insertedCategory.productCategoryName = createCategoryDto.productCategoryName;

    return this.productCategRepository.create({ ...insertedCategory });
  }

  async findAll(): Promise<FindAllReturnType> {
    const result = await this.productCategRepository.findAndCountAll({
      where: { isDeleted: false },
      order: [["createdAt", "DESC"]],
    });

    this.logger.log(`Fetched total ${result.count} Product Categories`);

    return result;
  }

  findOne(id: string) {
    return this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<[affectedCount: number, affectedRows: ProductCategory[]]> {
    const isProductCategoryAvailable = await this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      isProductCategoryAvailable.productCategoryName = updateCategoryDto.productCategoryName;

      const updatedData = await this.productCategRepository.update({ ...isProductCategoryAvailable }, { where: { productCategoryId: id, isDeleted: false }, returning: true });

      return updatedData;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Product Category you are trying update, it's not available!. Please check category ID.",
      });
    }
  }

  async remove(id: string): Promise<[affectedCount: number, affectedRows: ProductCategory[]]> {
    const isProductCategoryAvailable = await this.productCategRepository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      isProductCategoryAvailable.isDeleted = true;

      return this.productCategRepository.update({ ...isProductCategoryAvailable }, { where: { productCategoryId: id, isDeleted: false }, returning: true });
      // below line of code will delete the specific entry from the table itself.
      // return this.productCategRepository.remove([isProductCategoryAvailable]);
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Product Category you are trying update, it's not available!. Please check category ID.",
      });
    }
  }
}
