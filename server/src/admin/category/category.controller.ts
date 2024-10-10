import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
// import { Request } from "express";

// Service
import { CategoryService } from "./category.service";

// DTO (Data Transfer Object)
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

// Model
import { ProductCategory } from "./models/category.model";
// import { UserInRequest } from "../auth/decorators/user.decorator";
// import { AdminUserInRequest as AdminUserInRequestType } from "./interface";

@Controller("admin/category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<ProductCategory> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get("all")
  findAll() {
    // findAll(@Req() request: Request, @UserInRequest() adminUser: AdminUserInRequestType) {
    // console.log("Admin User from request", adminUser);

    return this.categoryService.findAll();
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
