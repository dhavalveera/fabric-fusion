import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Swagger
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { ProductSubCategoryService } from "./product-sub-category.service";

// DTO
import { CreateProductSubCategoryDto } from "./dto/create-product-sub-category.dto";
import { UpdateProductSubCategoryDto } from "./dto/update-product-sub-category.dto";

@ApiTags("Product Sub Category")
@ApiBearerAuth()
@Controller("admin/product-sub-category")
export class ProductSubCategoryController {
  constructor(private readonly productSubCategoryService: ProductSubCategoryService) {}

  @Post(":id/create")
  create(@Param("id") id: string, @Body() createProductSubCategoryDto: CreateProductSubCategoryDto) {
    return this.productSubCategoryService.create(id, createProductSubCategoryDto);
  }

  @Get(":id/all")
  findAll(@Param("id") id: string) {
    return this.productSubCategoryService.findAll(id);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.productSubCategoryService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductSubCategoryDto: UpdateProductSubCategoryDto) {
    return this.productSubCategoryService.update(id, updateProductSubCategoryDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.productSubCategoryService.remove(id);
  }
}
