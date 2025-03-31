import { Controller, Get, Post, Body, Delete } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// Service
import { RecentlyViewedService } from "./recently-viewed.service";

// DTO
import { CreateRecentlyViewedDto } from "./dto/create-recently-viewed.dto";

@ApiTags("Recently Viewed Products")
@ApiBearerAuth()
@Controller("user/recently-viewed/products")
export class RecentlyViewedController {
  constructor(private readonly recentlyViewedService: RecentlyViewedService) {}

  @Post("create")
  create(@Body() createRecentlyViewedDto: CreateRecentlyViewedDto, @UserInRequest() userInfo: UserType) {
    return this.recentlyViewedService.create(createRecentlyViewedDto, userInfo);
  }

  @Get("all")
  findAll(@UserInRequest() userInfo: UserType) {
    return this.recentlyViewedService.findAll(userInfo);
  }

  @Delete("clear")
  remove(@UserInRequest() userInfo: UserType) {
    return this.recentlyViewedService.remove(userInfo);
  }
}
