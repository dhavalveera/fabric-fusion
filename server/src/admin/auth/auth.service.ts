import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

// bcrypt
import { compareSync, hashSync } from "bcryptjs";

// TypeORM
import { Repository } from "typeorm";

// Custom Exception
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO (Data Transfer Object)
import { AccessToken, CreateAdminAuthDto, SignInAdminAuthDto } from "./dto/create-auth.dto";

// Model
import { AuthModel } from "./entities/auth.entity";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(AuthModel) private readonly adminReg: Repository<AuthModel>,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger("AdminAuthService");

  async signUp(createAdminAuthDto: CreateAdminAuthDto): Promise<AuthModel> {
    const isRegistrationAvailable = await this.adminReg.findOne({
      where: {
        email: createAdminAuthDto.email,
      },
    });

    if (isRegistrationAvailable) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Sorry, you are not allowed to sign up, Admin already exists",
      });
    } else {
      const adminData = new AuthModel();

      adminData.name = createAdminAuthDto.name;
      adminData.email = createAdminAuthDto.email;
      adminData.password = hashSync(createAdminAuthDto.password, 10);

      const adminInsertedData = await this.adminReg.save(adminData);

      if (adminInsertedData) {
        this.logger.log(`Admin registered Succesfully - ${adminInsertedData.name}`);

        return adminInsertedData;
      } else {
        this.logger.log("Unable to Create Admin. Please try again later.");

        throw new UnsuccessfulException();
      }
    }
  }

  async signIn(signInAdminAuthDto: SignInAdminAuthDto): Promise<AccessToken> {
    const isRegistrationAvailable = await this.adminReg.findOne({
      where: {
        email: signInAdminAuthDto.email,
        isDeleted: false,
        isActive: true,
      },
    });

    if (isRegistrationAvailable) {
      this.logger.log(`Admin Name: - ${isRegistrationAvailable.name} Found`);

      const verifiedPassword = compareSync(signInAdminAuthDto.password, isRegistrationAvailable.password);
      if (verifiedPassword) {
        const payload = {
          adminId: isRegistrationAvailable.adminRegistrationId,
          email: isRegistrationAvailable.email,
          name: isRegistrationAvailable.name,
          accountType: "admin",
        };

        this.logger.log(`Passowrd verified for Admin Name: - (${isRegistrationAvailable.name}) & EMail: - (${isRegistrationAvailable.email})`);

        return {
          access_token: await this.jwtService.signAsync(payload, { expiresIn: signInAdminAuthDto.rememberMe ? "30d" : "7d" }),
        };
      } else {
        this.logger.log(`Admin Name: - (${isRegistrationAvailable.name}) has used invalid Password which is (${signInAdminAuthDto.password}). Please re-check the password and try again`);

        throw new UnauthorizedException({
          statusCode: 401,
          message: "Wrong Credentials, Please verify your Login Credentials",
        });
      }
    } else {
      this.logger.log(`Sorry, No Admin found with (${signInAdminAuthDto.email}). Please check the credentials again!.`);

      throw new UnauthorizedException({
        statusCode: 401,
        message: "Sorry, Please check your email, Admin not found",
      });
    }
  }
}
