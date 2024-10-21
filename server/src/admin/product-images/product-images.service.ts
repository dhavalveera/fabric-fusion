import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { ProductsModel } from "../products/entities/product.entity";
import { ProductImagesModel } from "./entities/product-images.entity";

// DTO
import { CreateProductImagesDto } from "./dto/create-product-image.dto";

@Injectable()
export class ProductImagesService {
  private readonly productDetailsRepository: Repository<ProductsModel>;

  constructor(
    @InjectRepository(ProductImagesModel) private readonly productImagesRepository: Repository<ProductImagesModel>,
    private dataSource: DataSource,
  ) {
    this.productDetailsRepository = this.dataSource.getRepository(ProductsModel);
  }
  private readonly logger = new Logger("AdminProductImages");

  async create(id: string, createProductImagesDto: CreateProductImagesDto) {
    const isProductAvailable = await this.productDetailsRepository.findOne({ where: { productDetailsId: id, isDeleted: false } });

    if (isProductAvailable) {
      const productImagePayload = {
        ...createProductImagesDto,
        productDetailsFk: isProductAvailable,
      };

      const insertedProductImg = await this.productImagesRepository.save(productImagePayload);

      if (insertedProductImg) {
        this.logger.log(`Successfully Inserted/Added Image for ${isProductAvailable.productName}`);

        throw new HttpException("Success", HttpStatus.CREATED);
      } else {
        this.logger.log("Unable to Delete the Product Image");

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`The Product with ID - (${id}) for which you're trying to Upload Image is not available. Please check the product ID`);

      throw new HttpException(`The Product with ID - (${id}) for which you're trying to Upload Image is not available. Please check the product ID`, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    const isProductImgAvailable = await this.productImagesRepository.findOne({ where: { productImageId: id, isDeleted: false } });

    if (isProductImgAvailable) {
      const updatedProdImg = await this.productImagesRepository.update({ productImageId: id }, { isDeleted: true });

      if (updatedProdImg) {
        this.logger.log("Successfully Deleted (isDeleted) the Product Image");

        throw new SuccessException();
      } else {
        this.logger.log("Unable to Delete the Product Image");

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`Product Image ID - (${id}) is not available. Please check the ID again.`);

      throw new NotFoundException();
    }
  }
}
