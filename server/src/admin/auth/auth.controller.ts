import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

// Decorator
import { SkipAuth } from "./decorators/public.decorator";

// Admin Auth Service
import { AdminAuthService } from "./auth.service";

// DTO (Data Transfer Object) Type
import { CreateAdminAuthDto, SignInAdminAuthDto } from "./dto/create-auth.dto";

@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
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
