import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("admin/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get("all")
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
