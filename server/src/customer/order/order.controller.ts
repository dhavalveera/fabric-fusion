import { Controller, Get, Post, Body, Patch, Param, Query } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth } from "@nestjs/swagger";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Types
import { UserType } from "src/all-types";

// Service
import { OrderService } from "./order.service";

// DTO
import { CreateOrderDto } from "./dto/create-order.dto";

@ApiBearerAuth()
@Controller("user/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("create")
  create(@Body() createOrderDto: CreateOrderDto, @UserInRequest() userInfo: UserType) {
    return this.orderService.create(createOrderDto, userInfo);
  }

  @Patch(":orderId/address/update")
  updateAddressForOrderController(@Param("orderId") orderId: string, @Query("addressId") addressId: string, @UserInRequest() userInfo: UserType) {
    return this.orderService.updateAddressInOrder(orderId, addressId, userInfo);
  }

  @Get(":orderId/order/all")
  getAllCartDetailsBasedOnOrder(@Param("orderId") orderId: string, @UserInRequest() userInfo: UserType) {
    return this.orderService.getAllCartDetailsBasedOnOrder(orderId, userInfo);
  }

  @Get("purchased/all")
  findAll(@UserInRequest() userInfo: UserType) {
    return this.orderService.findAll(userInfo);
  }

  @Get("purchased/:orderId/details")
  findOne(@Param("orderId") orderId: string, @UserInRequest() userInfo: UserType) {
    return this.orderService.findOne(orderId, userInfo);
  }
}
