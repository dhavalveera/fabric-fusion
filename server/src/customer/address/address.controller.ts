import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

// Swagger Modules
import { ApiBearerAuth } from "@nestjs/swagger";

// Decorator (taking User from req appended in Auth Guard)
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Type
import { UserType } from "src/all-types";

// Service
import { AddressService } from "./address.service";

// DTO (Data Transfer Object)
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiBearerAuth()
@Controller("user/address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post("create")
  create(@UserInRequest() userInfo: UserType, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(userInfo, createAddressDto);
  }

  @Get("all")
  findAll(@UserInRequest() userInfo: UserType) {
    return this.addressService.findAll(userInfo);
  }

  @Get(":id/details")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(":id/update")
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(":id/delete")
  remove(@Param("id") id: string) {
    return this.addressService.remove(id);
  }

  @Patch(":id/change-primary-address")
  changePrimaryAddress(@UserInRequest() userInfo: UserType, @Param("id") id: string) {
    return this.addressService.changePrimaryAddress(userInfo, id);
  }
}
