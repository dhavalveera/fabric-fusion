import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

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
  constructor(
    @InjectModel(ProductSubCategory) private readonly subCategRepository: typeof ProductSubCategory,
    @InjectModel(ProductCategory) private readonly categoryRespository: typeof ProductCategory,
  ) {}

  async create(id: string, createSubCategoryDto: CreateSubCategoryDto): Promise<ProductSubCategory> {
    const isProductCategoryAvailable = await this.categoryRespository.findOne({ where: { productCategoryId: id, isDeleted: false } });

    if (isProductCategoryAvailable) {
      const productSubCateg = new ProductSubCategory();

      productSubCateg.productSubCategoryName = createSubCategoryDto.productSubCategoryName;
      productSubCateg.productSubCategoryImage = createSubCategoryDto.productSubCategoryImage;
      productSubCateg.productCategoryFk = isProductCategoryAvailable;

      return this.subCategRepository.create({ ...productSubCateg });
    }

    throw new HttpException(
      "Product Sub Category you are trying to create with Product Category ID is not matching or available in Database, please check the Category ID and try again",
      HttpStatus.NOT_FOUND,
    );
  }

  async findAll(productCategoryId: string): Promise<FindAllSubCategReturnType> {
    const isProductCategoryAvailable = await this.categoryRespository.findOne({ where: { productCategoryId: productCategoryId, isDeleted: false } });

    if (isProductCategoryAvailable) {
      return await this.subCategRepository.findAndCountAll({
        order: [["createdAt", "DESC"]],
        where: { productCategoryFk: isProductCategoryAvailable, isDeleted: false },
      });
    }

    throw new HttpException(
      "Product Sub Category you are trying to fetch with Product Category ID is not matching or available in Database, please check the Category ID and try again",
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: string): Promise<ProductSubCategory> {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      return isSubCategoryAvailable;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<ProductSubCategory> {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      isSubCategoryAvailable.productSubCategoryName = updateSubCategoryDto.productSubCategoryName;
      isSubCategoryAvailable.productSubCategoryImage = updateSubCategoryDto.productSubCategoryImage;

      return this.subCategRepository.create({ ...isSubCategoryAvailable });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: id, isDeleted: false } });

    if (isSubCategoryAvailable) {
      return this.subCategRepository.update({ isDeleted: true }, { where: { productSubCategoryId: id }, returning: true });

      // below line of code will delete the specific entry from the table itself.
      // return this.subCategRepository.remove([isSubCategoryAvailable]);
    } else {
      throw new NotFoundException();
    }
  }
}
