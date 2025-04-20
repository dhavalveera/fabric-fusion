import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Service
import { StaticPagesService } from "./static-pages.service";

// DTO
import { CreateStaticPageDto } from "./dto/create-static-page.dto";
import { UpdateStaticPageDto } from "./dto/update-static-page.dto";

// ENUM
import { StaticPageType } from "./constants";

@ApiTags("Static Page")
@Controller("admin/static-pages")
export class StaticPagesController {
  constructor(private readonly staticPagesService: StaticPagesService) {}

  @ApiBearerAuth()
  @Post("create")
  createStaticPage(@Body() createStaticPageDto: CreateStaticPageDto) {
    return this.staticPagesService.createStaticPage(createStaticPageDto);
  }

  @ApiBearerAuth()
  @Get("all")
  findAll() {
    return this.staticPagesService.findAll();
  }

  @ApiBearerAuth()
  @Get(":pageType/details")
  getSingle(@Param("pageType") pageType: string) {
    return this.staticPagesService.findStaticPageContent(pageType as StaticPageType);
  }

  @ApiBearerAuth()
  @Patch(":id/update")
  updateContent(@Body() payload: UpdateStaticPageDto, @Param("id") id: string) {
    return this.staticPagesService.updateStaticPageContent(id, payload);
  }

  @ApiBearerAuth()
  @Delete(":id/:pageType/delete")
  deleteContent(@Param("id") id: string, @Param("pageType") pageType: string) {
    return this.staticPagesService.deleteStaticPage(id, pageType as StaticPageType);
  }
}
