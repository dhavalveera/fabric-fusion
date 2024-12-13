import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Service
import { RegionTagsService } from "./region-tags.service";

// DTO
import { CreateRegionTagDto } from "./dto/create-region-tag.dto";
import { UpdateRegionTagDto } from "./dto/update-region-tag.dto";

@Controller("admin/region-tags")
export class RegionTagsController {
  constructor(private readonly regionTagsService: RegionTagsService) {}

  @Post("create")
  create(@Body() createRegionTagDto: CreateRegionTagDto) {
    return this.regionTagsService.create(createRegionTagDto);
  }

  @Get("all")
  findAll() {
    return this.regionTagsService.findAll();
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.regionTagsService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateRegionTagDto: UpdateRegionTagDto) {
    return this.regionTagsService.update(id, updateRegionTagDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.regionTagsService.remove(id);
  }
}
