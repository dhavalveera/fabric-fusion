import { Controller, Get, Post, Body, Param, Delete, Patch } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth } from "@nestjs/swagger";

// Decorator for User from req
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Type
import { UserType } from "src/all-types";

// Service
import { CartService } from "./cart.service";

// DTO (Data Transfer Object)
import { CreateCartDto } from "./dto/create-cart.dto";
import { DeleteCartDto } from "./dto/delete-cart.dto";
import { UpdateCartQuantityDto } from "./dto/update-cart.dto";

@ApiBearerAuth()
@Controller("user/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("create")
  create(@Body() createCartDto: CreateCartDto, @UserInRequest() userInfo: UserType) {
    return this.cartService.create(createCartDto, userInfo);
  }

  @Get("all")
  findAll(@UserInRequest() userInfo: UserType) {
    return this.cartService.findAll(userInfo);
  }

  @Patch(":id/quantity/update")
  updateCart(@Param("id") id: string, @Body() updateCardBody: UpdateCartQuantityDto, @UserInRequest() userInfo: UserType) {
    return this.cartService.updateCart(id, updateCardBody, userInfo);
  }

  @Delete(":id/delete")
  deleteCart(@Param("id") id: string, @UserInRequest() userInfo: UserType) {
    return this.cartService.deleteCart(id, userInfo);
  }

  @Delete("delete/all")
  deleteAllCart(@Body() deleteCartItemsDto: DeleteCartDto, @UserInRequest() userInfo: UserType) {
    return this.cartService.deleteAllCart(deleteCartItemsDto, userInfo);
  }
}
