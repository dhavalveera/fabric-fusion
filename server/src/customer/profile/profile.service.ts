import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, Repository } from "typeorm";

// bcrypt
import { compareSync, hashSync } from "bcryptjs";

// Exception Filters
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Type
import { UserType } from "src/all-types";

// Model
import { CustomerDetailsModel } from "../auth/entities/customer-details.entity";
import { CustomerRegistrationsModel } from "../auth/entities/customer-registrations.entity";

// DTO (Data Transfer Object)
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class ProfileService {
  private readonly customerDetailsRepository: Repository<CustomerDetailsModel>;
  private readonly customerRegRepository: Repository<CustomerRegistrationsModel>;
  private readonly logger = new Logger("UserProfileService");

  constructor(private readonly dataSource: DataSource) {
    this.customerDetailsRepository = this.dataSource.getRepository(CustomerDetailsModel);
    this.customerRegRepository = this.dataSource.getRepository(CustomerRegistrationsModel);
  }

  async profileDetail(@UserInRequest() userInfo: UserType) {
    const userDetails = await this.customerDetailsRepository
      .createQueryBuilder("customerDetails")
      .leftJoinAndSelect("customerDetails.customerRegistrationFk", "customerRegistration")
      .select([
        "customerDetails.customerDetailsId",
        "customerDetails.firstName",
        "customerDetails.lastName",
        "customerDetails.isProfileCompleted",
        "customerDetails.isDeleted",
        "customerDetails.createdAt",
        "customerRegistration.customerRegistrationId",
        "customerRegistration.emailAddress",
        "customerRegistration.phoneNumber",
        "customerRegistration.isEmailVerified",
        "customerRegistration.isDeleted",
        "customerRegistration.createdAt",
      ])
      .where("customerDetails.customerDetailsId = :customerDetailsId", { customerDetailsId: userInfo.customerDetailsId })
      .andWhere("customerDetails.isDeleted = :isDeleted", { isDeleted: false })
      .getOne();

    if (userDetails) {
      return userDetails;
    } else {
      this.logger.warn(`No User Profile found for Customer/User - (${userInfo.name})`);

      throw new UnsuccessfulException(`No User Profile found for Customer/User - (${userInfo.name})`);
    }
  }

  async changePassword(passwordPayload: ChangePasswordDto, @UserInRequest() userInfo: UserType) {
    const isRegistrationAvailable = await this.customerRegRepository.findOne({ where: { customerRegistrationId: userInfo.userId, isDeleted: false } });

    if (isRegistrationAvailable) {
      const decodedPassword = compareSync(passwordPayload.oldPassword, isRegistrationAvailable.password);

      if (decodedPassword) {
        const hashedPassword = hashSync(passwordPayload.newPassword, 10);

        const updatedCustomerRegData = await this.customerRegRepository.update({ customerRegistrationId: userInfo.userId }, { password: hashedPassword });

        if (updatedCustomerRegData) {
          this.logger.log(`Changed Password Successfully for Customer/User - (${userInfo.name})`);

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to Update the New Password!. Please try again later.`);

          throw new UnsuccessfulException(`Unable to Update the New Password!. Please try again later.`);
        }
      } else {
        this.logger.warn(`Old Password does not match. Please re-check the Old Password`);

        throw new UnsuccessfulException(`Old Password does not match. Please re-check the Old Password`);
      }
    } else {
      this.logger.warn(`No Customer Registration Found!.`);

      throw new UnsuccessfulException(`No Customer Registration Found!.`);
    }
  }
}
