import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// Typeorm
import { DataSource, Repository } from "typeorm";

// DTO (Data Transfer Object)
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";

// Model
import { ProductSubCategory } from "./models/sub-category.model";
import { ProductCategory } from "../category/models/category.model";

// interface
import { FindAllSubCategReturnType } from "./interface";

@Injectable()
export class SubCategoryService {
  private categoryRespository: Repository<ProductCategory>;

  constructor(
    @InjectRepository(ProductSubCategory) private readonly subCategRepository: Repository<ProductSubCategory>,
    private dataSource: DataSource,
  ) {
    this.categoryRespository = this.dataSource.getRepository(ProductCategory);
  }

  async create(id: string, createSubCategoryDto: CreateSubCategoryDto): Promise<ProductSubCategory> {
    const isProductCategoryAvailable = await this.categoryRespository.findOneBy({ productCategoryId: id, isDeleted: false });

    if (isProductCategoryAvailable) {
      const productSubCateg = new ProductSubCategory();

      productSubCateg.productSubCategoryName = createSubCategoryDto.productSubCategoryName;
      productSubCateg.productSubCategoryImage = createSubCategoryDto.productSubCategoryImage;
      productSubCateg.productCategoryFk = isProductCategoryAvailable;

      return this.subCategRepository.save(productSubCateg);
    }

    throw new HttpException(
      "Product Sub Category you are trying to create with Product Category ID is not matching or available in Database, please check the Category ID and try again",
      HttpStatus.NOT_FOUND,
    );
  }

  async findAll(productCategoryId: string): Promise<FindAllSubCategReturnType> {
    const isProductCategoryAvailable = await this.categoryRespository.findOneBy({ productCategoryId: productCategoryId, isDeleted: false });

    if (isProductCategoryAvailable) {
      const [subCategories, subCategoriesCount] = await this.subCategRepository.findAndCount({
        order: { createdAt: "DESC" },
        where: { productCategoryFk: isProductCategoryAvailable, isDeleted: false },
      });

      return { subCategories, subCategoriesCount };
    }

    throw new HttpException(
      "Product Sub Category you are trying to fetch with Product Category ID is not matching or available in Database, please check the Category ID and try again",
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: string): Promise<ProductSubCategory> {
    const isSubCategoryAvailable = await this.subCategRepository.findOneBy({ productSubCategoryId: id, isDeleted: false });

    if (isSubCategoryAvailable) {
      return isSubCategoryAvailable;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<ProductSubCategory> {
    const isSubCategoryAvailable = await this.subCategRepository.findOneBy({ productSubCategoryId: id, isDeleted: false });

    if (isSubCategoryAvailable) {
      isSubCategoryAvailable.productSubCategoryName = updateSubCategoryDto.productSubCategoryName;
      isSubCategoryAvailable.productSubCategoryImage = updateSubCategoryDto.productSubCategoryImage;

      return this.subCategRepository.save(isSubCategoryAvailable);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isSubCategoryAvailable = await this.subCategRepository.findOneBy({ productSubCategoryId: id, isDeleted: false });

    if (isSubCategoryAvailable) {
      isSubCategoryAvailable.isDeleted = true;

      return this.subCategRepository.save(isSubCategoryAvailable);

      // below line of code will delete the specific entry from the table itself.
      // return this.subCategRepository.remove([isSubCategoryAvailable]);
    } else {
      throw new NotFoundException();
    }
  }
}
