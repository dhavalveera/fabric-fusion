import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { CareInstructionModel } from "../care-instruction/entities/care-instruction.entity";
import { ProductSizeModel } from "../product-size/entities/product-size.entity";
import { ReturnPolicyModel } from "../return-policy/entities/return-policy.entity";
import { ProductSubCategoryModel } from "../product-sub-category/entities/product-sub-category.entity";
import { ProductsModel } from "./entities/product.entity";

// DTO
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly careInstructionRepository: Repository<CareInstructionModel>;
  private readonly productSizeRepository: Repository<ProductSizeModel>;
  private readonly returnPolicyRepository: Repository<ReturnPolicyModel>;
  private readonly subCategRepository: Repository<ProductSubCategoryModel>;

  constructor(
    @InjectRepository(ProductsModel) private readonly productDetailsRepository: Repository<ProductsModel>,
    private readonly dataSource: DataSource,
  ) {
    this.careInstructionRepository = this.dataSource.getRepository(CareInstructionModel);
    this.productSizeRepository = this.dataSource.getRepository(ProductSizeModel);
    this.returnPolicyRepository = this.dataSource.getRepository(ReturnPolicyModel);
    this.subCategRepository = this.dataSource.getRepository(ProductSubCategoryModel);
  }
  private readonly logger = new Logger("ProductDetails");

  async create(createProductDto: CreateProductDto) {
    const isProdSubCategoryAvailable = await this.subCategRepository.findOne({ where: { productSubCategoryId: createProductDto.productSubCategoryId, isDeleted: false } });

    if (isProdSubCategoryAvailable) {
      const productDetailsPayload = {
        ...createProductDto.productDetails,
        productSubCategoryFk: isProdSubCategoryAvailable,
      };

      const productData = await this.productDetailsRepository.save(productDetailsPayload);

      if (productData) {
        if (createProductDto.careInstruction && Object.keys(createProductDto.careInstruction).length !== 0) {
          const careInstructionPayload = {
            ...createProductDto.careInstruction,
            productDetailsFk: productData,
          };

          await this.careInstructionRepository.save(careInstructionPayload);
        }

        if (createProductDto.returnPolicy && Object.keys(createProductDto.returnPolicy).length !== 0) {
          const returnPolicyPayload = {
            ...createProductDto.returnPolicy,
            productDetailFk: productData,
          };

          await this.returnPolicyRepository.save(returnPolicyPayload);
        }

        const productSizeData = createProductDto.productSize.map(sizes => {
          const productSizes = new ProductSizeModel();
          productSizes.size = sizes.size;
          productSizes.totalStock = sizes.totalStock;
          productSizes.stockRemaining = sizes.totalStock;
          productSizes.productDetailFk = productData;
          return productSizes;
        });

        await this.productSizeRepository.save(productSizeData);

        this.logger.log(`Successfully Created Product - ${productData.productName}`);

        throw new HttpException(`Successfully Created Product - ${productData.productName}`, HttpStatus.CREATED);
      } else {
        this.logger.error("Unable to Create Product, Please try again later.");

        throw new UnsuccessfulException();
      }
    } else {
      throw new HttpException(`Product Sub Category ID - (${createProductDto.productSubCategoryId}) is not a valid ID, please try again with correct Sub Category ID`, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<{ rows: ProductsModel[]; count: number }> {
    // const [rows, count] = await this.productDetailsRepository.findAndCount({
    //   where: { isDeleted: false },
    //   order: { createdAt: "DESC" },
    //   relations: ["productSubCategoryFk.productCategoryFk"],
    // });

    const [rows, count] = await this.productDetailsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.productSubCategoryFk", "productSubCategory")
      .leftJoinAndSelect("productSubCategory.productCategoryFk", "productCategory")
      .leftJoinAndSelect("products.sizes", "sizes")
      .leftJoinAndSelect("products.careInstructionsFk", "careInstruction")
      .leftJoinAndSelect("products.returnPolicyFk", "returnPolicy")
      .leftJoinAndSelect("products.productImagesFk", "productImages", "productImages.isDeleted = :isDeleted OR productImages.isDeleted IS NULL", { isDeleted: false })
      .where("products.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("products.createdAt", "DESC")
      .getManyAndCount();

    // console.log("allProducts => ", allProducts);

    if (count > 0) {
      this.logger.log(`Found Total ${count} Products`);

      return { count, rows };
    } else {
      this.logger.error("findAll - Not Products Found!.");

      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<ProductsModel> {
    // const singleProductData = await this.productDetailsRepository.findOne({
    //   where: { productDetailsId: id, isDeleted: false },
    //   relations: ["productSubCategoryFk.productCategoryFk"],
    // });
    const singleProductData = await this.productDetailsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.productSubCategoryFk", "productSubCategory")
      .leftJoinAndSelect("productSubCategory.productCategoryFk", "productCategory")
      .leftJoinAndSelect("products.sizes", "sizes")
      .leftJoinAndSelect("products.careInstructionsFk", "careInstruction")
      .leftJoinAndSelect("products.returnPolicyFk", "returnPolicy")
      .leftJoinAndSelect("products.productImagesFk", "productImages", "productImages.isDeleted = :isDeleted OR productImages.isDeleted IS NULL", { isDeleted: false })
      .where("products.productDetailsId = :productDetailsId", { productDetailsId: id })
      .getOne();

    if (singleProductData) {
      this.logger.log(`Found 1 product matching ${id} -> ${singleProductData.productName}`);

      return singleProductData;
    } else {
      this.logger.error("Single Product Details Not Products Found!.");

      throw new NotFoundException();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const singleProductData = await this.productDetailsRepository.findOne({
      where: { productDetailsId: id, isDeleted: false },
    });

    if (singleProductData) {
      // Update Product Details

      const updatedProductData = this.productDetailsRepository.merge(singleProductData, updateProductDto.productDetails);
      await this.productDetailsRepository.save(updatedProductData);

      // Update the Care Instruction
      if (updateProductDto.careInstruction && Object.keys(updateProductDto.careInstruction).length !== 0) {
        if (singleProductData.careInstructionsFk) {
          const updatedCareInstructionData = this.careInstructionRepository.merge(singleProductData.careInstructionsFk, updateProductDto.careInstruction);
          await this.careInstructionRepository.save(updatedCareInstructionData);

          this.logger.log("Updated Existing Care Instruction Data");
        } else {
          const newCareInstruction = this.careInstructionRepository.create({
            ...updateProductDto.careInstruction,
            productDetailsFk: updatedProductData,
          });
          await this.careInstructionRepository.save(newCareInstruction);

          this.logger.log("Created New Care Instruction Data");
        }
      }

      // Update the Return Policy
      if (updateProductDto.returnPolicy && Object.keys(updateProductDto.returnPolicy).length !== 0) {
        if (singleProductData.returnPolicyFk) {
          const updatedReturnPolicyData = this.returnPolicyRepository.merge(singleProductData.returnPolicyFk, updateProductDto.returnPolicy);
          await this.returnPolicyRepository.save(updatedReturnPolicyData);

          this.logger.log("Updated Existing Return Poicy Data");
        } else {
          const newReturnPolicy = this.returnPolicyRepository.create({
            ...updateProductDto.returnPolicy,
            productDetailFk: updatedProductData,
          });
          await this.returnPolicyRepository.save(newReturnPolicy);

          this.logger.log("Created New Return Poicy Data");
        }
      }

      // Update the Product Sizes
      if (updateProductDto.productSize.length !== 0) {
        const existingSizes = singleProductData.sizes || [];

        const updatedSizeData = updateProductDto.productSize.map(sizeDto => {
          const existingSize = existingSizes.find(s => s.size === sizeDto.size);

          if (existingSize) {
            // Calculate the difference in totalStock
            const stockDifference = sizeDto.totalStock - existingSize.totalStock;

            // If the `totalStock`increases, update stockRemaining accordingly
            const updatedSize = this.productSizeRepository.merge(existingSize, {
              ...sizeDto,
              stockRemaining: stockDifference > 0 ? existingSize.stockRemaining + stockDifference : existingSize.stockRemaining, // Don't decrease stockRemaining if totalStock decreases
            });

            return updatedSize;
          } else {
            // Create New Size it doesn't exists
            const newSize = this.productSizeRepository.create({
              ...sizeDto,
              stockRemaining: sizeDto.totalStock,
              productDetailFk: updatedProductData,
            });
            return newSize;
          }
        });

        // Save the updated Sizes (and create new ones if necessary)
        await this.productSizeRepository.save(updatedSizeData);

        this.logger.log("Save the updated Sizes (and create new ones if necessary)");

        // Remove any sizes that no longer exist in the updated data
        const sizeToDelete = existingSizes.filter(existingSize => !updateProductDto.productSize.some(sizeDto => sizeDto.size === existingSize.size));
        if (sizeToDelete.length) {
          await this.productSizeRepository.remove(sizeToDelete);

          this.logger.log("Remove any sizes that no longer exist in the updated data");
        }
      }

      this.logger.log(`Successfully Updated Product - ${updatedProductData.productName}`);

      throw new SuccessException();
    } else {
      this.logger.error("Not Products Found!.");

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const singleProductData = await this.productDetailsRepository.findOne({
      where: { productDetailsId: id, isDeleted: false },
    });

    if (singleProductData) {
      const updatedData = await this.productDetailsRepository.update({ productDetailsId: id, isDeleted: false }, { isDeleted: true });

      if (updatedData) {
        this.logger.log(`Successfully Deleted (isDeleted: true) for Product with ID (${singleProductData.productDetailsId}) and Name (${singleProductData.productName})`);

        throw new SuccessException();
      } else {
        this.logger.error(`Unable to update the Product -- ${singleProductData.productName}.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error("Not Products Found!.");

      throw new NotFoundException();
    }
  }
}
