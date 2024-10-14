import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/sequelize";

// DTO (Data Transfer Object)
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

// Model
import { ProductSubCategory } from "../sub-category/models/sub-category.model";
import { ProductSize } from "../product-sizes/models/product-size.model";
import { CareInstruction } from "./models/care-instructions.model";
import { ProductDetailsModel } from "./models/product.model";
import { ReturnPolicy } from "./models/return-policy.model";

// Type/interface
import { FindAllProducts } from "./interface";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(CareInstruction) private readonly careInstructionModel: typeof CareInstruction,
    @InjectModel(ProductDetailsModel) private readonly productDetailsModel: typeof ProductDetailsModel,
    @InjectModel(ReturnPolicy) private readonly returnPolicyModel: typeof ReturnPolicy,
    @InjectModel(ProductSize) private readonly productSizeRepository: typeof ProductSize,
    @InjectModel(ProductSubCategory) private readonly prodSubCategRepository: typeof ProductSubCategory,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // const prodSubCategoryData = await this.prodSubCategRepository.findOne({ where: {productSubCategoryId: createProductDto.productDetails.productSubCategoryFk} });

    // const productDetailsPayload = {
    //   ...createProductDto.productDetails,
    //   productSubCategoryFk: prodSubCategoryData,
    // };

    const productData = await this.productDetailsModel.create({ ...createProductDto.productDetails });

    if (productData) {
      if (createProductDto.careInstruction && Object.keys(createProductDto.careInstruction).length !== 0) {
        const careInstructionPaylaod = {
          ...createProductDto.careInstruction,
          productDetailFk: productData.productDetailsId,
        };

        await this.careInstructionModel.create({ ...careInstructionPaylaod });
      }

      if (createProductDto.returnPolicy && Object.keys(createProductDto.returnPolicy).length !== 0) {
        const returnPolicyPayload = {
          ...createProductDto.returnPolicy,
          returnPolicyFk: productData.productDetailsId,
        };

        await this.returnPolicyModel.create({ ...returnPolicyPayload });
      }

      const productSizeData = createProductDto.productSize.map(sizes => {
        const productSizes = new ProductSize();
        productSizes.size = sizes.size;
        productSizes.totalStock = sizes.totalStock;
        productSizes.stockRemaining = sizes.totalStock;
        productSizes.productDetailFk = productData;
        return productSizes;
      });

      await this.productSizeRepository.create({ ...productSizeData });

      throw new HttpException("Product Created Successfully!..", HttpStatus.CREATED);
    } else {
      throw new HttpException("Unable to process right now, please try again later", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<FindAllProducts> {
    return await this.productDetailsModel.findAndCountAll({
      where: { isDeleted: false },
      order: [["createdAt", "DESC"]],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
