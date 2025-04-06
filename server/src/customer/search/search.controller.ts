import { Controller, Post, Query } from "@nestjs/common";

// Decorator to Skip Auth Check
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";

// Service
import { SearchService } from "./search.service";

@Controller("common/search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @SkipAuth()
  @Post("product")
  searchProduct(@Query("query") query: string) {
    return this.searchService.searchProduct(query);
  }
}
