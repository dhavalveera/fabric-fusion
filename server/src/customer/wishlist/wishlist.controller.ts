import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";

// Service
import { WishlistService } from "./wishlist.service";

// DTO (Data Transfer Object)
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

@Controller("customer/wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post("create")
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get("all")
  findAll() {
    return this.wishlistService.findAll();
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.wishlistService.remove(id);
  }
}
