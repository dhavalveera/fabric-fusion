import { Body, Controller, Delete, Param, Post } from "@nestjs/common";

// Service
import { ProductImagesService } from "./product-images.service";

// DTO
import { CreateProductImagesDto } from "./dto/create-product-image.dto";

@Controller("admin/products/images")
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post(":id/add")
  create(@Param("id") id: string, @Body() createProductImagesDto: CreateProductImagesDto) {
    return this.productImagesService.create(id, createProductImagesDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.productImagesService.remove(id);
  }
}
