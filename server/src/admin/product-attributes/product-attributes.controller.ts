import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProductAttributesService } from "./product-attributes.service";
import { CreateProductAttributeDto } from "./dto/create-product-attribute.dto";
import { UpdateProductAttributeDto } from "./dto/update-product-attribute.dto";

@Controller("admin/product-attributes")
export class ProductAttributesController {
  constructor(private readonly productAttributesService: ProductAttributesService) {}

  @Post(":id/create")
  create(@Param("id") id: string, @Body() createProductAttributeDto: CreateProductAttributeDto) {
    return this.productAttributesService.create(id, createProductAttributeDto);
  }

  @Get(":id/all")
  findAll(@Param("id") id: string) {
    return this.productAttributesService.findAll(id);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.productAttributesService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductAttributeDto: UpdateProductAttributeDto) {
    return this.productAttributesService.update(id, updateProductAttributeDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.productAttributesService.remove(id);
  }
}
