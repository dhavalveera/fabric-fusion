import { Controller, Get, Res } from "@nestjs/common";

// express
import type { Response } from "express";

// Swagger
import { ApiExcludeController } from "@nestjs/swagger";

// Auth Decorate to Skin Auth Check for those Routes
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// Service
import { FeedsService } from "./feeds.service";

// @ApiExcludeController() => used to exclude specific API Endpoint from the Swagger
@ApiExcludeController()
@Controller("feeds")
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @SkipAuth()
  @Get("/google")
  generateGoogle() {
    return this.feedsService.generateGoogleFeeds();
  }

  @SkipAuth()
  @Get("/bing.xml")
  async generateBing(@Res() res: Response) {
    const xmlFeed = await this.feedsService.generateBingFeed();

    res.setHeader("Content-Type", "application/xml");
    res.send(xmlFeed);
  }

  @SkipAuth()
  @Get("/pinterest.csv")
  async generatePinterest(@Res() res: Response) {
    const csvFeed = await this.feedsService.generatePinterestFeed();

    res.setHeader("Content-Type", "text/csv");
    res.send(csvFeed);
  }
}
