import { Module } from "@nestjs/common";

// Controller + Service
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
