import { Module } from "@nestjs/common";
import { CacheInvalidatorService } from "./cache-invalidator.service";

@Module({
  providers: [CacheInvalidatorService],
})
export class CacheInvalidatorModule {}
