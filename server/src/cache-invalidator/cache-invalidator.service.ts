import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { OnEvent } from "@nestjs/event-emitter";

// Invalidator Keys CONSTANTS
import {
  // ADMIN_CACHE_KEYS,
  CUSTOMER_CACHE_KEYS,
} from "src/constants/cache-keys";

@Injectable()
export class CacheInvalidatorService {
  private readonly logger = new Logger("CustomerCommonService");

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private async del(key: string) {
    await this.cacheManager.del(key);
    this.logger.log(`⛔ Invalidated cache key: ${key}`);
  }

  // When ADS is created
  @OnEvent(CUSTOMER_CACHE_KEYS.ADS)
  async onAdsCreate() {
    await this.del(CUSTOMER_CACHE_KEYS.ADS);
  }

  // Invalidate all CACHE together, if required
  @OnEvent("customer.invalidate-all")
  async onFullCustomerRefresh() {
    for (const key of Object.values(CUSTOMER_CACHE_KEYS)) {
      await this.del(key);
    }
  }
}
