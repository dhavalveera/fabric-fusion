import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

// Model
import { CartsModel } from "./entities/cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartsModel])],
  controllers: [CartController],
  providers: [CartService],
  exports: [TypeOrmModule],
})
export class CartModule {}
