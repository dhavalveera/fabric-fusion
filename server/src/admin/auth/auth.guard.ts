import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// Express
import { Request } from "express";

// JWT
import { JwtService } from "@nestjs/jwt";

// Decorator
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
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

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request["user"] = payload;
    } catch (error) {
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
