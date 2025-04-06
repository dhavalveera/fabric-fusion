import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";

// Model
import { CustomerAddressModel } from "./entities/address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddressModel])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
