import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

// Admin Auth Service
import { AdminAuthService } from "./admin-auth.service";

// DTO (Data Transfer Object) Type
import { CreateAdminAuthDto, SignInAdminAuthDto } from "./dto/create-admin-auth.dto";

@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  signUp(@Body() createAdminAuthDto: CreateAdminAuthDto) {
    return this.adminAuthService.signUp(createAdminAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() loginAdminAuthDto: SignInAdminAuthDto) {
    return this.adminAuthService.signIn(loginAdminAuthDto);
  }
}
