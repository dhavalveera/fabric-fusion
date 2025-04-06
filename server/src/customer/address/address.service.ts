import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { Repository } from "typeorm";

// Types
import { UserType } from "src/all-types";

// Custom Exception
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO (Data Transfer Object)
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

// Model
import { CustomerAddressModel } from "./entities/address.entity";

@Injectable()
export class AddressService {
  private readonly logger = new Logger("CustomerAddressService");

  constructor(@InjectRepository(CustomerAddressModel) private readonly customerAddressRepository: Repository<CustomerAddressModel>) {}

  async create(userInfo: UserType, createAddressDto: CreateAddressDto) {
    const [, count] = await this.customerAddressRepository.findAndCount({ where: { customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false } });

    if (count !== 3) {
      const createdAddress = this.customerAddressRepository.create({
        ...createAddressDto,
        customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
      });

      const insertedData = await this.customerAddressRepository.save(createdAddress);

      if (insertedData) {
        this.logger.log(`Successfully Added Address for Customer/User - (${userInfo.name})`);

        throw new HttpException(`Successfully Added Address for Customer/User - (${userInfo.name})`, HttpStatus.CREATED);
      } else {
        this.logger.warn(`Unable to Create Customer Address.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`Sorry, only 3 Address is allowed to be added!`);

      throw new HttpException("Sorry, only 3 Address is allowed to be added!", HttpStatus.FORBIDDEN);
    }
  }

  async findAll(userInfo: UserType): Promise<{ rows: CustomerAddressModel[]; count: number }> {
    const [rows, count] = await this.customerAddressRepository.findAndCount({ where: { customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isDeleted: false } });

    if (count > 0) {
      this.logger.log(`Found Toatal ${count} Customer Address for ${userInfo.name}`);

      return { count, rows };
    } else {
      this.logger.warn(`No Customer Address Found for Customer/User - ${userInfo.name}`);

      throw new UnsuccessfulException(`No Customer Address Found for Customer/User - ${userInfo.name}`);
    }
  }

  async findOne(id: string): Promise<CustomerAddressModel> {
    const isAddressPresent = await this.customerAddressRepository.findOne({ where: { customerAddressId: id, isDeleted: false } });

    if (isAddressPresent) {
      this.logger.log(`Address Found with ID - (${id})`);

      return isAddressPresent;
    } else {
      this.logger.error(`No Address Found for ID (${id})`);

      throw new NotFoundException();
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const isAddressPresent = await this.customerAddressRepository.findOne({ where: { customerAddressId: id, isDeleted: false } });

    if (isAddressPresent) {
      this.logger.log(`Address Found with ID - (${id})`);

      const updatedAddress = await this.customerAddressRepository.update({ customerAddressId: id, isDeleted: false }, updateAddressDto);

      if (updatedAddress) {
        this.logger.log(`Address Updated Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Update the Address for ID - (${id})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Address Found for ID (${id})`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isAddressPresent = await this.customerAddressRepository.findOne({ where: { customerAddressId: id, isDeleted: false } });

    if (isAddressPresent) {
      if (isAddressPresent.isPrimaryAddress) {
        this.logger.error(`Cannot delete Primary Address, Change the Primary Address and then try again!.`);

        throw new UnsuccessfulException(`Cannot delete Primary Address, Change the Primary Address and then try again!.`);
      } else {
        const updatedAddress = await this.customerAddressRepository.update({ customerAddressId: id, isDeleted: false, isPrimaryAddress: false }, { isDeleted: true });

        if (updatedAddress) {
          this.logger.log(`Deleted (isDeleted: true) Address Successfully!.`);

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to Delete (isDeleted: true) the Address for ID - (${id})`);

          throw new UnsuccessfulException();
        }
      }
    } else {
      this.logger.error(`No Address Found for ID (${id})`);

      throw new NotFoundException();
    }
  }

  async changePrimaryAddress(userInfo: UserType, id: string) {
    const isAddressPresent = await this.customerAddressRepository.findOne({ where: { customerAddressId: id, isDeleted: false } });

    if (!isAddressPresent) {
      this.logger.error(`No Address Found for ID (${id})`);

      throw new NotFoundException();
    }

    if (isAddressPresent.isPrimaryAddress === true) {
      this.logger.error(`Address is already set as Primary.`);

      throw new UnsuccessfulException("Address is already set as Primary.");
    }

    // Reset any existing Primary Address for the Same Customer
    await this.customerAddressRepository.update({ customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId }, isPrimaryAddress: true }, { isPrimaryAddress: false });

    // Set the specified address as primary
    const updateResult = await this.customerAddressRepository.update({ customerAddressId: id, isDeleted: false }, { isPrimaryAddress: true });

    if (updateResult) {
      this.logger.log(`Changed Primary Address Successfully for ID - (${id})`);

      throw new SuccessException();
    } else {
      this.logger.warn(`Unable to Change Primary Address for ID - (${id})`);

      throw new UnsuccessfulException();
    }
  }
}
