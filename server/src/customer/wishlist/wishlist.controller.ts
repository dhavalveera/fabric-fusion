import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth } from "@nestjs/swagger";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// types
import { UserType } from "src/all-types";

// Service
import { WishlistService } from "./wishlist.service";

// DTO (Data Transfer Object)
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

@ApiBearerAuth()
@Controller("user/wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post("create")
  create(@Body() createWishlistDto: CreateWishlistDto, @UserInRequest() userInfo: UserType) {
    return this.wishlistService.create(createWishlistDto, userInfo);
  }

  @Get("all")
  findAll(@UserInRequest() userInfo: UserType) {
    return this.wishlistService.findAll(userInfo);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string, @UserInRequest() userInfo: UserType) {
    return this.wishlistService.remove(id, userInfo);
  }
}
