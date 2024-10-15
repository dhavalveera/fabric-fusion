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
import { ProductsModel } from "./entities/product.entity";

// DTO
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  private readonly careInstructionRepository: Repository<CareInstructionModel>;
  private readonly productSizeRepository: Repository<ProductSizeModel>;
  private readonly returnPolicyRepository: Repository<ReturnPolicyModel>;

  constructor(
    @InjectRepository(ProductsModel) private readonly productDetailsRepository: Repository<ProductsModel>,
    private readonly dataSource: DataSource,
  ) {
    this.careInstructionRepository = this.dataSource.getRepository(CareInstructionModel);
    this.productSizeRepository = this.dataSource.getRepository(ProductSizeModel);
    this.returnPolicyRepository = this.dataSource.getRepository(ReturnPolicyModel);
  }
  private readonly logger = new Logger("ProductDetails");

  async create(createProductDto: CreateProductDto) {
    const productData = await this.productDetailsRepository.save(createProductDto.productDetails);

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
  }

  async findAll(): Promise<{ rows: ProductsModel[]; count: number }> {
    const [rows, count] = await this.productDetailsRepository.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });

    if (count > 0) {
      this.logger.log(`Found Total ${count} Products`);

      return { count, rows };
    } else {
      this.logger.error("Not Products Found!.");

      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<ProductsModel> {
    const singleProductData = await this.productDetailsRepository.findOne({
      where: { productDetailsId: id, isDeleted: false },
    });

    if (singleProductData) {
      this.logger.log(`Found 1 product matching ${id} -> ${singleProductData.productName}`);

      return singleProductData;
    } else {
      this.logger.error("Not Products Found!.");

      throw new NotFoundException();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const singleProductData = await this.productDetailsRepository.findOne({
      where: { productDetailsId: id, isDeleted: false },
    });

    if (singleProductData) {
      return singleProductData;
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
