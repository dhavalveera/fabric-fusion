import { Controller, Get, Body, Patch, Param, Query } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth } from "@nestjs/swagger";

// Service
import { OrdersService } from "./orders.service";

// DTO (Data Transfer Object)
import { UpdateOrderDto } from "./dto/update-order.dto";

// Interface/Type
import { OrderStatusType } from "./types/interfaces";

@ApiBearerAuth()
@Controller("admin/orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get("all")
  findAll(@Query("pageNumber") pageNumber: string, @Query("pageSize") pageSize: string, @Query("orderStatus") orderStatus: OrderStatusType) {
    return this.ordersService.findAll(Number(pageNumber), Number(pageSize), orderStatus);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
