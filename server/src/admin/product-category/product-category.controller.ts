import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Service
import { ProductCategoryService } from "./product-category.service";

// DTO
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";

@Controller("admin/product-category")
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post("create")
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get("all")
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.productCategoryService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(id, updateProductCategoryDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.productCategoryService.remove(id);
  }
}
