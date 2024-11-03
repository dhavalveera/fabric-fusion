import { Module } from "@nestjs/common";

// TypeORM
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";

// Model
import { OrderDetailsModel } from "./entities/order.entity";
import { OrderItemsModel } from "./entities/order-items.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailsModel, OrderItemsModel])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
