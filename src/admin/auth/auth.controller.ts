import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";

// Swagger
import { ApiTags } from "@nestjs/swagger";

// Auth Service
import { AdminAuthService } from "./auth.service";

// DTO (Data Transfer Object)
import { CreateAdminAuthDto, SignInAdminAuthDto } from "./dto/create-auth.dto";

// Decorator
import { SkipAuth } from "./decorators/public.decorator";

@ApiTags("Auth")
@Controller("auth/admin")
export class AuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  signUp(@Body() createAdminAuthDto: CreateAdminAuthDto) {
    return this.adminAuthService.signUp(createAdminAuthDto);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() loginAdminAuthDto: SignInAdminAuthDto) {
    return this.adminAuthService.signIn(loginAdminAuthDto);
  }
}
