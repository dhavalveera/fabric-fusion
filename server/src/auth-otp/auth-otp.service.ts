import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";

// Nestjs JWT
import { JwtService } from "@nestjs/jwt";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

// dayjs
import dayjs from "dayjs";

// Email Service
import { EmailServiceService } from "src/email-service/email-service.service";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// utils
import { generateOtp } from "src/utils/otp.util";

// Entity/Model
import { AuthModel as AdminAuthModel } from "src/admin/auth/entities/auth.entity";
import { CustomerRegistrationsModel } from "src/customer/auth/entities/customer-registrations.entity";
import { AuthOtpModel } from "./entities/auth-otp.entity";

// DTO
import { CreateAuthOtpDto } from "./dto/create-auth-otp.dto";
import { VerifyOTPDto } from "./dto/verify-otp.dto";

@Injectable()
export class AuthOtpService {
  private readonly logger = new Logger(AuthOtpService.name);
  private readonly adminAuthRepository: Repository<AdminAuthModel>;
  private readonly customerRegRepository: Repository<CustomerRegistrationsModel>;

  constructor(
    @InjectRepository(AuthOtpModel) private readonly authOtpModel: Repository<AuthOtpModel>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly emailService: EmailServiceService,
  ) {
    this.adminAuthRepository = this.dataSource.getRepository(AdminAuthModel);
    this.customerRegRepository = this.dataSource.getRepository(CustomerRegistrationsModel);
  }

  /**
   * This TypeScript function generates and sends a one-time password (OTP) for multi-factor
   * authentication (2FA) via email.
   * @param {CreateAuthOtpDto} generateAndSendOtpDto - The `generateAndSendOtp` function takes a
   * parameter `generateAndSendOtpDto` of type `CreateAuthOtpDto`. This parameter likely contains
   * information required to generate and send an OTP (One-Time Password) for authentication purposes.
   * The properties of `generateAndSendOtpDto
   */
  async generateAndSendOtp(generateAndSendOtpDto: CreateAuthOtpDto): Promise<{ statusCode: number; message: string }> {
    const otp = generateOtp();

    const expiresAt = dayjs().add(10, "minutes").toDate(); // Expires in 10 Minutes

    const createdOtp = this.authOtpModel.create({
      email: generateAndSendOtpDto.email,
      otp,
      expiresAt,
      role: generateAndSendOtpDto.role,
    });
    const insertedOtp = await this.authOtpModel.save(createdOtp);

    if (insertedOtp) {
      this.logger.log(`OTP Inserted & Generated Successfully for Email: ${insertedOtp.email}, Role: ${insertedOtp.role} and OTP is: ${insertedOtp.otp}`);

      const { message: emailMessage, statusCode } = await this.emailService.sendMFAOtp(insertedOtp.email, insertedOtp.otp);

      if (statusCode === 200) {
        this.logger.log(`2FA OTP Sent on Email Successfully!..`);

        return { statusCode: 201, message: "2FA OTP Sent on Email Successfully!." };
      } else {
        this.logger.warn(`${emailMessage}`);

        return { statusCode: 400, message: "Unable to send 2FA OTP Email." };
      }
    } else {
      this.logger.warn(`Unable to Insert the 2FA OTP in the Database!.`);

      throw new UnsuccessfulException();
    }
  }

  /**
   * The function `verifyOtp` verifies a user's OTP based on email, OTP value, and role, handling cases
   * of expired OTP, mismatched OTP, and email mismatch.
   * @param {VerifyOTPDto} verifyOtpDto - The `verifyOtp` function is used to verify a One-Time
   * Password (OTP) provided by a user. Here's a breakdown of the steps it takes:
   */
  async verifyOtp(verifyOtpDto: VerifyOTPDto) {
    const { email, otp, role } = verifyOtpDto;

    // 1. Find the OTP record based on email and userType
    const record = await this.authOtpModel.findOne({ where: { email, otp, isVerified: false, role }, order: { createdAt: "DESC" } });

    if (record) {
      // 2. Handle case: Expired OTP
      if (record.expiresAt < new Date()) {
        // Optional: Delete the expired OTP record
        await this.authOtpModel.delete({ otpVerificationId: record.otpVerificationId, email, otp });

        this.logger.error(`2FA OTP is Expired!. Please request for new OTP!.`);

        throw new UnsuccessfulException(`2FA OTP is Expired!. Please request for new OTP!.`);
      }

      // 3. Handle case: OTP doesn't match
      if (record.otp !== otp) {
        this.logger.error(`2FA OTP does not match!. Please check again!. Original OTP: ${record.otp}, OTP from User: ${otp}`);

        throw new UnsuccessfulException(`2FA OTP does not match!. Please check again!.`);
      }

      // 4. Handle case: Email mismatch (optional, only if you're using wider lookup logic)
      if (record.email !== email) {
        this.logger.error(`Email mismatch for OTP verification.`);

        throw new UnauthorizedException("Email mismatch for OTP verification.");
      }

      // 5. Success - OTP is verified
      const otpDeleted = await this.authOtpModel.delete({ otpVerificationId: record.otpVerificationId, otp });

      if (otpDeleted.affected && otpDeleted.affected > 0) {
        this.logger.log(`2FA OTP Verified Successfully and deleted as well!.`);

        if (role === "admin") {
          const isRegistrationAvailable = await this.adminAuthRepository.findOne({
            where: {
              email: email,
              isDeleted: false,
              isActive: true,
            },
          });

          if (isRegistrationAvailable) {
            const payload = {
              adminId: isRegistrationAvailable.adminRegistrationId,
              email: isRegistrationAvailable.email,
              name: isRegistrationAvailable.name,
              accountType: "admin",
            };

            throw new HttpException(
              {
                status: HttpStatus.OK,
                access_token: await this.jwtService.signAsync(payload, { expiresIn: verifyOtpDto.rememberMe ? "30d" : "7d" }),
              },
              HttpStatus.OK,
            );
          } else {
            this.logger.log(`Sorry, No Admin found with (${email}). Please check the credentials again!.`);

            throw new UnauthorizedException({
              statusCode: 401,
              message: "Sorry, Please check your email, Admin not found",
            });
          }
        } else if (role === "user") {
          const isCustomerAvailable = await this.customerRegRepository.findOne({ where: { emailAddress: email, isDeleted: false, isEmailVerified: true } });

          if (isCustomerAvailable) {
            const customerData = await this.customerRegRepository.findOne({
              where: { emailAddress: email, isDeleted: false, customerDetailsFk: { isDeleted: false } },
              relations: ["customerDetailsFk"],
            });

            const tokenPayload = {
              userId: customerData.customerRegistrationId,
              phoneNumber: customerData.phoneNumber,
              email: customerData.emailAddress,
              name: `${customerData.customerDetailsFk.firstName} ${customerData.customerDetailsFk.lastName}`,
              customerDetailsId: customerData.customerDetailsFk.customerDetailsId,
              accountType: "user",
            };

            throw new HttpException(
              {
                status: HttpStatus.OK,
                access_token: await this.jwtService.signAsync(tokenPayload, { expiresIn: verifyOtpDto.rememberMe ? "30d" : "7d" }),
              },
              HttpStatus.OK,
            );
          } else {
            this.logger.error(`No Customer Account found with given Email Address - (${email})`);

            throw new NotFoundException(`No Customer Account found with given Email Address - (${email})`);
          }
        }
      } else {
        this.logger.error(`Unable to delete the 2FA OTP.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`Email Address & OTP you are trying to Verify does not match the records!. Please check the Email & 2FA OTP.`);

      throw new NotFoundException(`Email Address & OTP you are trying to Verify does not match the records!. Please check the Email & 2FA OTP.`);
    }
  }

  /**
   * The `resendOtp` function asynchronously generates and sends an OTP using the provided data.
   * @param {CreateAuthOtpDto} resendOtpDto - The `resendOtpDto` parameter is of type
   * `CreateAuthOtpDto` and is used to pass the necessary data required for generating and sending an
   * OTP (One-Time Password) for authentication purposes.
   */
  async resendOtp(resendOtpDto: CreateAuthOtpDto) {
    // STEP 1: Check for an existing OTP that hasn't been verified yet and belongs to the same user
    const existingOtp = await this.authOtpModel.findOne({
      where: {
        email: resendOtpDto.email, // Email ID of the user
        role: resendOtpDto.role, // Role: "admin" or "user"
        isVerified: false, // Only check for OTPs that are not yet verified
      },
      order: { createdAt: "DESC" }, // Prefer the latest OTP if multiple exist
    });

    // STEP 2: If a valid (non-expired) OTP exists → reuse it
    if (existingOtp && existingOtp.expiresAt > new Date()) {
      this.logger.log(`Reusing existing valid OTP for ${existingOtp.email} [${existingOtp.role}]`);

      // Send the same OTP again to the user via email
      await this.emailService.sendMFAOtp(existingOtp.email, existingOtp.otp); // Custom service for email delivery

      throw new SuccessException("OTP re-send successfully!.");
    }

    // STEP 3: If no OTP exists or it's expired → delete the old one (if exists)
    if (existingOtp) {
      await this.authOtpModel.delete({
        otpVerificationId: existingOtp.otpVerificationId,
      });

      this.logger.warn(`Expired OTP for ${existingOtp.email} & Role: ${existingOtp.role} deleted`);
    }

    // STEP 4: Generate a new 6-digit OTP
    const newOtp = generateOtp(); // Example output: "389245"

    // STEP 5: Set expiry time (e.g., 10 minutes from now)
    const expiresAt = dayjs().add(10, "minutes").toDate(); // Expires in 10 Minutes;

    // STEP 6: Create a new OTP record instance (but not saved yet)
    const newOtpRecord = this.authOtpModel.create({
      email: resendOtpDto.email, // Save email address
      otp: newOtp, // Newly generated OTP
      role: resendOtpDto.role, // User role: admin or user
      expiresAt, // OTP validity
    });

    // STEP 7: Save the new OTP in the database
    const insertedOtp = await this.authOtpModel.save(newOtpRecord);

    if (insertedOtp) {
      const { message: emailMessage, statusCode } = await this.emailService.sendMFAOtp(insertedOtp.email, insertedOtp.otp);

      if (statusCode === 200) {
        this.logger.log(`2FA OTP Sent on Email Successfully!..`);

        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: "2FA OTP Sent on Email Successfully!.",
          },
          HttpStatus.OK,
        );
      } else {
        this.logger.warn(`${emailMessage}`);

        throw new UnsuccessfulException("Unable to send 2FA OTP Email.");
      }
    } else {
      this.logger.warn(`Unable to Insert the 2FA OTP in the Database!.`);

      throw new UnsuccessfulException();
    }
  }
}
