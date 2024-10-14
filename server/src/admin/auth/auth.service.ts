import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";

// bcryptjs
import { compareSync, hashSync } from "bcryptjs";

// DTO --- Type
import { AccessToken, CreateAdminAuthDto, SignInAdminAuthDto } from "./dto/create-auth.dto";

// Admin Registration Model
import { AdminRegistrations } from "./models/adminRegistration.model";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(AdminRegistrations) private adminReg: typeof AdminRegistrations,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createAdminAuthDto: CreateAdminAuthDto): Promise<AdminRegistrations> {
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
      const adminData = new AdminRegistrations();

      adminData.name = createAdminAuthDto.name;
      adminData.email = createAdminAuthDto.email;
      adminData.password = hashSync(createAdminAuthDto.password, 10);

      return this.adminReg.create({ ...adminData });
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
      const verifiedPassword = compareSync(signInAdminAuthDto.password, isRegistrationAvailable.password);
      if (verifiedPassword) {
        const payload = {
          adminId: isRegistrationAvailable.adminRegistrationId,
          email: isRegistrationAvailable.email,
          name: isRegistrationAvailable.name,
          accountType: "admin",
        };

        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException({
          statusCode: 401,
          message: "Wrong Credentials, Please verify your Login Credentials",
        });
      }
    } else {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Sorry, Please check your email, Admin not found",
      });
    }
  }
}
