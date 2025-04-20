import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { OnEvent } from "@nestjs/event-emitter";

// Invalidator Keys CONSTANTS
import { ADMIN_CACHE_KEYS, CUSTOMER_CACHE_KEYS } from "src/constants/cache-keys";

@Injectable()
export class CacheInvalidatorService {
  private readonly logger = new Logger("CustomerCommonService");

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private async del(key: string) {
    await this.cacheManager.del(key);
    this.logger.log(`⛔ Invalidated cache key: ${key}`);
  }

  // ADMIN EVENT EMITTER FOR CLEARING CACHE
  // When Category is Created
  @OnEvent(ADMIN_CACHE_KEYS.CATEGORY)
  async onCategoryCreate() {
    await this.del(ADMIN_CACHE_KEYS.CATEGORY);
  }

  // When Sub Category is Created
  @OnEvent(ADMIN_CACHE_KEYS.SUB_CATEGORY)
  async onSubCategoryCreate() {
    await this.del(ADMIN_CACHE_KEYS.SUB_CATEGORY);
  }

  // When Region Tags is Added for New Product
  @OnEvent(ADMIN_CACHE_KEYS.REGION_TAGS)
  async onAddingRegionTagToNewProd() {
    await this.del(ADMIN_CACHE_KEYS.REGION_TAGS);
  }

  // When New Product is Created
  @OnEvent(ADMIN_CACHE_KEYS.NEWEST_PRODUCTS)
  async onNewProductCreate() {
    await this.del(ADMIN_CACHE_KEYS.NEWEST_PRODUCTS);
  }

  // Invalidate all ADMIN CACHE together, if required
  @OnEvent(ADMIN_CACHE_KEYS.INVALIDATE_ALL)
  async onFullAdminRefresh() {
    for (const key of Object.values(ADMIN_CACHE_KEYS)) {
      await this.del(key);
    }
  }

  // CUSTOMER EVENT EMITTER FOR CLEARING CACHE
  // When ADS is created
  @OnEvent(CUSTOMER_CACHE_KEYS.ADS)
  async onAdsCreate() {
    await this.del(CUSTOMER_CACHE_KEYS.ADS);
  }

  // When Product is Added or Removed from Wishlist
  @OnEvent(CUSTOMER_CACHE_KEYS.LOVED_PRODS)
  async onWishlistCRUD() {
    await this.del(CUSTOMER_CACHE_KEYS.LOVED_PRODS);
  }

  // Invalidate all CUSTOMER CACHE together, if required
  @OnEvent(CUSTOMER_CACHE_KEYS.INVALIDATE_ALL)
  async onFullCustomerRefresh() {
    for (const key of Object.values(CUSTOMER_CACHE_KEYS)) {
      await this.del(key);
    }
  }
}
