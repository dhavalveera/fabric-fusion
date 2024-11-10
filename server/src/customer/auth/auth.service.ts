import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { Repository } from "typeorm";

// bcrypt
import { compareSync } from "bcryptjs";

// Email Service
import { EmailServiceService } from "src/email-service/email-service.service";

// Custom Exception Filters
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// OTP Generator Utility Function
import { generateOTP } from "src/utils/generate-otp";

// Models
import { CustomerDetailsModel } from "./entities/customer-details.entity";
import { CustomerRegistrationsModel } from "./entities/customer-registrations.entity";

// DTO (Data Transfer Object)
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { AccessToken, VerifyOTPDto } from "./dto/verify-otp.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger("CustomerAuthService");

  constructor(
    @InjectRepository(CustomerDetailsModel) private readonly customerDetailsModel: Repository<CustomerDetailsModel>,
    @InjectRepository(CustomerRegistrationsModel) private readonly customerRegModel: Repository<CustomerRegistrationsModel>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailServiceService,
  ) {}

  async create(createAuthDto: SignUpDto) {
    const isRegistrationAvailable = await this.customerRegModel.findOne({ where: { emailAddress: createAuthDto.customerRegistration.emailAddress, isDeleted: false } });

    if (isRegistrationAvailable) {
      this.logger.error(`Email/Phone Number already existing, please try a different Email/Phone Number`);

      throw new HttpException("Email/Phone Number already existing, please try a different Email/Phone Number", HttpStatus.CONFLICT);
    } else {
      const OTP = generateOTP();
      const createNewReg = this.customerRegModel.create({
        ...createAuthDto.customerRegistration,
        otpCode: OTP,
      });

      const newlyRegistrationData = await this.customerRegModel.save(createNewReg);

      if (newlyRegistrationData) {
        const createNewCustDet = this.customerDetailsModel.create({
          ...createAuthDto.customerDetails,
          customerRegistrationFk: newlyRegistrationData,
        });

        await this.customerDetailsModel.save(createNewCustDet);

        const { statusCode, message: emailSMTPMsg } = await this.emailService.sendOTPForNewRegistrationMailer(
          `${createNewCustDet.firstName} ${createNewCustDet.lastName}`,
          newlyRegistrationData.emailAddress,
          OTP,
        );

        if (statusCode === 400) {
          this.logger.warn(`SMTP Email Info: ${JSON.stringify(emailSMTPMsg)}`);

          throw new UnsuccessfulException(`SMTP Email Info: ${JSON.stringify(emailSMTPMsg)}`);
        } else {
          this.logger.log(`Customer (${createNewCustDet.firstName} ${createNewCustDet.lastName}) Account created Successfully -- ${JSON.stringify(newlyRegistrationData)}`);

          throw new HttpException("Success", HttpStatus.CREATED);
        }
      } else {
        this.logger.warn("Unable to create Customer.");

        throw new UnsuccessfulException();
      }
    }
  }

  async signInService(signInDto: SignInDto): Promise<AccessToken> {
    const isRegistrationAvailable = await this.customerRegModel.findOne({ where: { emailAddress: signInDto.emailAddress, isDeleted: false, isEmailVerified: true } });

    if (isRegistrationAvailable) {
      const verifiedPassword = compareSync(signInDto.password, isRegistrationAvailable.password);

      if (verifiedPassword) {
        const customerData = await this.customerRegModel.findOne({
          where: { emailAddress: signInDto.emailAddress, isDeleted: false, customerDetailsFk: { isDeleted: false } },
          relations: ["customerDetailsFk"],
        });

        if (customerData) {
          const tokenPayload = {
            userId: customerData.customerRegistrationId,
            phoneNumber: customerData.phoneNumber,
            email: customerData.emailAddress,
            name: `${customerData.customerDetailsFk.firstName} ${customerData.customerDetailsFk.lastName}`,
            customerDetailsId: customerData.customerDetailsFk.customerDetailsId,
            accountType: "user",
          };

          this.logger.log(`Account Details verified for Login for Customer Name: - ${customerData.customerDetailsFk.firstName}`);

          return {
            access_token: await this.jwtService.signAsync(tokenPayload, { expiresIn: "7d" }),
          };
        } else {
          this.logger.warn(`Unable to Find Customer Data.`);

          throw new UnsuccessfulException();
        }
      } else {
        this.logger.error(`Password is incorrect, please check again`);

        throw new UnauthorizedException(`Password is incorrect, please check again`);
      }
    } else {
      this.logger.error(`No Customer Account found with given Email Address - (${signInDto.emailAddress})`);

      throw new NotFoundException(`No Customer Account found with given Email Address - (${signInDto.emailAddress})`);
    }
  }

  async verifyEmailOTPService(verifyOtpPayload: VerifyOTPDto) {
    const isRegistrationAvailable = await this.customerRegModel.findOne({
      where: {
        customerRegistrationId: verifyOtpPayload.customerRegistrationId,
        emailAddress: verifyOtpPayload.emailAddress,
        isEmailVerified: false,
        isDeleted: false,
        customerDetailsFk: { isDeleted: false },
      },
      relations: ["customerDetailsFk"],
    });

    if (isRegistrationAvailable) {
      if (verifyOtpPayload.otpCode === isRegistrationAvailable.otpCode) {
        const updatedData = await this.customerRegModel.update({ customerRegistrationId: verifyOtpPayload.customerRegistrationId, isDeleted: false }, { isEmailVerified: true });

        if (updatedData) {
          this.logger.log(
            `Customer Email Address verified Successfully. Customer Name - (${isRegistrationAvailable.customerDetailsFk.firstName} ${isRegistrationAvailable.customerDetailsFk.lastName}) & Email Address - (${isRegistrationAvailable.emailAddress})`,
          );

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to Update the Customer Registration Data.`);

          throw new UnsuccessfulException();
        }
      } else {
        this.logger.error(`You have entered incorrect OTP (${verifyOtpPayload.otpCode}), please enter the correct OTP`);

        throw new HttpException("You have entered incorrect OTP, please enter the correct OTP", HttpStatus.FORBIDDEN);
      }
    } else {
      this.logger.error(`No Customer Account found with given Email Address - (${verifyOtpPayload.emailAddress})`);

      throw new NotFoundException(`No Customer Account found with given Email Address - (${verifyOtpPayload.emailAddress})`);
    }
  }
}
