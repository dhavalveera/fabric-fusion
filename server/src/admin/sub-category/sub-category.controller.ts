import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SubCategoryService } from "./sub-category.service";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";

@Controller("admin/sub-category")
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post(":id/create")
  create(@Param("id") id: string, @Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(id, createSubCategoryDto);
  }

  @Get(":productCategoryId/all")
  findAll(@Param("productCategoryId") productCategoryId: string) {
    return this.subCategoryService.findAll(productCategoryId);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.subCategoryService.remove(id);
  }
}
