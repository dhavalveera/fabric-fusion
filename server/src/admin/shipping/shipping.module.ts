import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { ShippingService } from "./shipping.service";
import { ShippingController } from "./shipping.controller";

// Model
import { DeliveryDetailsModel } from "./entities/shipping.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryDetailsModel])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
