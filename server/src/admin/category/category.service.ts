import { HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// typeorm
import { Repository } from "typeorm";

// DTO - Data Transfer Object
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

// Model
import { ProductCategory } from "./models/category.model";

// Type
import { FindAllReturnType } from "./interface";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(ProductCategory) private readonly productCategRepository: Repository<ProductCategory>) {}
  private readonly logger = new Logger();

  create(createCategoryDto: CreateCategoryDto): Promise<ProductCategory> {
    const insertedCategory = new ProductCategory();

    insertedCategory.productCategoryName = createCategoryDto.productCategoryName;

    return this.productCategRepository.save(insertedCategory);
  }

  async findAll(): Promise<FindAllReturnType> {
    const [categories, categroriesCount] = await this.productCategRepository.findAndCount({ order: { createdAt: "DESC" }, where: { isDeleted: false } });

    this.logger.log(`Fetched total ${categroriesCount} Product Categories`);

    return { categories, categroriesCount };
  }

  findOne(id: string) {
    return this.productCategRepository.findOneBy({ productCategoryId: id, isDeleted: false });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ProductCategory> {
    const isProductCategoryAvailable = await this.productCategRepository.findOneBy({ productCategoryId: id, isDeleted: false });

    if (isProductCategoryAvailable) {
      isProductCategoryAvailable.productCategoryName = updateCategoryDto.productCategoryName;

      return this.productCategRepository.save(isProductCategoryAvailable);
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Product Category you are trying update, it's not available!. Please check category ID.",
      });
    }
  }

  async remove(id: string): Promise<ProductCategory> {
    const isProductCategoryAvailable = await this.productCategRepository.findOneBy({ productCategoryId: id, isDeleted: false });

    if (isProductCategoryAvailable) {
      isProductCategoryAvailable.isDeleted = true;

      return this.productCategRepository.save(isProductCategoryAvailable);
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
