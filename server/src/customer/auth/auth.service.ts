import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { Repository } from "typeorm";

// bcrypt
import { compareSync, hashSync } from "bcryptjs";

// crypto
import { randomBytes } from "crypto";

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
import { PasswordResetTokenModel } from "./entities/password-reset-token.entity";

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
    @InjectRepository(PasswordResetTokenModel) private readonly pwdResetTokenModel: Repository<PasswordResetTokenModel>,
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
            access_token: await this.jwtService.signAsync(tokenPayload, { expiresIn: signInDto.rememberMe ? "30d" : "7d" }),
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

  async forgotPassword(forgotPasswordPayload: { emailAddress: string }) {
    const isUserAvailable = await this.customerRegModel.findOne({
      where: { emailAddress: forgotPasswordPayload.emailAddress, isEmailVerified: true, isDeleted: false },
      relations: ["customerDetailsFk"],
    });

    if (isUserAvailable) {
      const token = randomBytes(16).toString("hex"); // Generate secure random token
      const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      const resetToken = this.pwdResetTokenModel.create({
        token,
        tokenExpiry,
        customerRegistrationFk: { customerRegistrationId: isUserAvailable.customerRegistrationId },
      });

      const resetTokenData = await this.pwdResetTokenModel.save(resetToken);

      if (resetTokenData) {
        const { statusCode, message: emailSMTPMsg } = await this.emailService.forgotPasswordMailer(
          `${isUserAvailable.customerDetailsFk.firstName} ${isUserAvailable.customerDetailsFk.lastName}`,
          isUserAvailable.emailAddress,
          token,
        );

        if (statusCode === 400) {
          this.logger.warn(`SMTP Email Info: ${JSON.stringify(emailSMTPMsg)}`);

          throw new UnsuccessfulException(`SMTP Email Info: ${JSON.stringify(emailSMTPMsg)}`);
        } else {
          this.logger.log(`Forgot Password Email Sent successfully for Customer/User -- (${isUserAvailable.customerDetailsFk.firstName} ${isUserAvailable.customerDetailsFk.lastName})`);

          throw new SuccessException();
        }
      } else {
        this.logger.warn(`Unable to Generate/Store the Reset Password Token for requested User - (${isUserAvailable.customerDetailsFk.firstName} ${isUserAvailable.customerDetailsFk.lastName})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Customer/User Found with Email - (${forgotPasswordPayload.emailAddress}). Please check the Email`);

      throw new NotFoundException(`No Customer/User Found with Email - (${forgotPasswordPayload.emailAddress}). Please check the Email`);
    }
  }

  async resetPassword(token: string, newPasswordPayload: { newPassword: string }) {
    const isTokenAvailable = await this.pwdResetTokenModel.findOne({ where: { token }, relations: ["customerRegistrationFk", "customerRegistrationFk.customerDetailsFk"] });

    if (isTokenAvailable) {
      if (isTokenAvailable.tokenExpiry < new Date()) {
        this.logger.error(`Token has expired!.`);

        throw new UnsuccessfulException(`Token has expired!.`);
      } else if (isTokenAvailable.isPasswordResetted) {
        this.logger.error(`Token has already been used!.`);

        throw new UnsuccessfulException(`Token has already been used!.`);
      } else {
        const hashedPassword = hashSync(newPasswordPayload.newPassword, 10);

        const newPasswordData = await this.customerRegModel.update({ customerRegistrationId: isTokenAvailable.customerRegistrationFk.customerRegistrationId }, { password: hashedPassword });

        if (newPasswordData) {
          await this.pwdResetTokenModel.update({ passwordResetTokenId: isTokenAvailable.passwordResetTokenId }, { isPasswordResetted: true });

          this.logger.log(
            `Password Updated Successfully for Customer/User - (${isTokenAvailable.customerRegistrationFk.customerDetailsFk.firstName} ${isTokenAvailable.customerRegistrationFk.customerDetailsFk.lastName})!.`,
          );

          throw new SuccessException();
        } else {
          this.logger.warn(`Unable to Save New Password!. Please try again later.`);

          throw new UnsuccessfulException(`Unable to Save New Password!. Please try again later.`);
        }
      }
    } else {
      this.logger.error(`(${token}) - Token not found!. Please check the token again.`);

      throw new NotFoundException(`(${token}) - Token not found!. Please check the token again.`);
    }
  }
}
