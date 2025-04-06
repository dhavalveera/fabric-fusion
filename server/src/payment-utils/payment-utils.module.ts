import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Service
import { UtilsServiceService } from "./payment-utils.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [UtilsServiceService],
  exports: [UtilsServiceService],
})
export class UtilsServiceModule {}
