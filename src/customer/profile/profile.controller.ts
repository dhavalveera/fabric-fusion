import { Body, Controller, Get, Patch } from "@nestjs/common";

// Service
import { ProfileService } from "./profile.service";

// Decorator
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Type
import { UserType } from "src/all-types";

// DTO (Data Transfer Object)
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller("user/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("details")
  profileDetail(@UserInRequest() userInfo: UserType) {
    return this.profileService.profileDetail(userInfo);
  }

  @Patch("change-password")
  changePassword(@Body() passwordPayload: ChangePasswordDto, @UserInRequest() userInfo: UserType) {
    return this.profileService.changePassword(passwordPayload, userInfo);
  }
}
