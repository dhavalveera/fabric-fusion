import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// Express
import { Request } from "express";

// JWT
import { JwtService } from "@nestjs/jwt";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Models
import { AuthModel as AdminAuthModel } from "./entities/auth.entity";
import { CustomerRegistrationsModel } from "src/customer/auth/entities/customer-registrations.entity";

// Decorator
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly adminAuthModelRepository: Repository<AdminAuthModel>;
  private readonly customRegRepository: Repository<CustomerRegistrationsModel>;

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {
    this.adminAuthModelRepository = this.dataSource.getRepository(AdminAuthModel);
    this.customRegRepository = this.dataSource.getRepository(CustomerRegistrationsModel);
  }
  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.error("Access Token Missing.");
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Sorry, Looks like you dont have the required authorization. Access Token Missing.",
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: "FabricFusionJWTSecret" });

      this.logger.log(`Authenticated User Payload => ${JSON.stringify(payload)}`);

      const route = `/api/${payload.accountType}`;

      if (payload.accountType === "admin" && request.originalUrl.includes(route) && request.originalUrl.indexOf(route) === 0) {
        const adminDetails = await this.adminAuthModelRepository.findOne({ where: { email: payload.email, isActive: true, isDeleted: false } });

        if (adminDetails.adminRegistrationId === payload.adminId) {
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          request["user"] = payload;

          return true;
        } else {
          this.logger.error("Sorry Admin, Looks like you dont have the required authorization.");

          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Sorry, Looks like you dont have the required authorization.",
          });
        }
      } else if (payload.accountType === "user" && request.originalUrl.includes(route) && request.originalUrl.indexOf(route) === 0) {
        const customerDetails = await this.customRegRepository.findOne({ where: { emailAddress: payload.email, isDeleted: false, isEmailVerified: true }, relations: ["customerDetailsFk"] });

        if (customerDetails.customerRegistrationId === payload.userId) {
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          request["user"] = payload;

          return true;
        } else {
          this.logger.error("Sorry Customer, Looks like you dont have the required authorization.");

          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "Sorry, Looks like you dont have the required authorization.",
          });
        }
      }
    } catch (error) {
      console.log("error", error);

      this.logger.error("Access Token Missing.");

      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Access Token Missing.",
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
