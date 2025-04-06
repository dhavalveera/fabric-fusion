import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Swagger
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { RegionTagsService } from "./region-tags.service";

// DTO
import { CreateRegionTagDto } from "./dto/create-region-tag.dto";
import { UpdateRegionTagDto } from "./dto/update-region-tag.dto";

@ApiTags("Region Tags")
@ApiBearerAuth()
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
