import { Inject, Injectable, Logger } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

// TypeORM
import { DataSource, Repository } from "typeorm";

// Cache
import { Cache } from "cache-manager";

// Custom Exception Filters
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Cache Invalidator Keys
import { ADMIN_CACHE_KEYS } from "src/constants/cache-keys";

// Models
import { ProductsModel } from "src/admin/products/entities/product.entity";

@Injectable()
export class FeedsService {
  private readonly logger = new Logger(FeedsService.name);

  private readonly productsRepository: Repository<ProductsModel>;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dataSource: DataSource,
  ) {
    this.productsRepository = this.dataSource.getRepository(ProductsModel);
  }

  async generateGoogleFeeds() {
    const cachedValue = await this.cacheManager.get(ADMIN_CACHE_KEYS.NEWEST_PRODUCTS);

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 39, returned Google Feeds Products from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.productsRepository.findAndCount({ where: { isDeleted: false }, order: { createdAt: "DESC" } });

      if (count > 0) {
        const googleFormattedProducts = rows.map(product => {
          // Find if ANY size has stock > 0
          const isAvailable = product.sizes.some(size => size.stockRemaining > 0);

          return {
            id: product.productDetailsId,
            title: product.productName,
            description: product.metaDescription,
            link: `${process.env.CLIENT_WEB_URL}/product/${product.productSlug}`,
            image_link: product.productDisplayImage,
            price: `${product.productPrice} INR`,
            availability: isAvailable ? "in stock" : "out of stock",
            condition: "new",
            gender: product.gender,
            color: product.colorOptions.join("/"),
            brand: product.brandName,
          };
        });

        return { items: googleFormattedProducts };
      } else {
        this.logger.error(`Unable to find Products for Google Search`);

        throw new UnsuccessfulException();
      }
    }
  }

  async generateBingFeed(): Promise<string> {
    const cachedValue = await this.cacheManager.get(ADMIN_CACHE_KEYS.NEWEST_PRODUCTS);

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 39, returned Google Feeds Products from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.productsRepository.findAndCount({ where: { isDeleted: false }, order: { createdAt: "DESC" } });

      if (count > 0) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>';

        rows.forEach(product => {
          const isAvailable = product.sizes.some(size => size.stockRemaining > 0);

          xml += `
            <item>
              <title>${product.productName}</title>
              <link>${process.env.CLIENT_WEB_URL}/product/${product.productSlug}</link>
              <description>${product.metaDescription}</description>
              <price>${product.productPrice}</price>
              <image_link>${product.productDisplayImage}</image_link>
              <availability>${isAvailable ? "in stock" : "out of stock"}</availability>
              <brand>${product.brandName}</brand>
              <condition>new</condition>
              <gender>${product.gender}</gender>
              <color>${product.colorOptions.join("/")}</color>
            </item>
          `;
        });

        xml += "\n</channel>\n</rss>";

        return xml;
      } else {
        this.logger.error(`Unable to find Products for Bing Search`);

        throw new UnsuccessfulException();
      }
    }
  }

  async generatePinterestFeed() {
    const cachedValue = await this.cacheManager.get(ADMIN_CACHE_KEYS.NEWEST_PRODUCTS);

    if (typeof cachedValue === "string") {
      this.logger.log(`Line # 39, returned Google Feeds Products from Cache.`);

      return JSON.parse(cachedValue);
    } else {
      const [rows, count] = await this.productsRepository.findAndCount({ where: { isDeleted: false }, order: { createdAt: "DESC" } });

      if (count > 0) {
        let csv = "ID,Title,Description,Link,Image URL,Price,Availability,Condition,Gender,Color\n";

        rows.forEach(product => {
          const isAvailable = product.sizes.some(size => size.stockRemaining > 0);

          csv += `${product.productDetailsId},${product.productName},${product.metaDescription},${process.env.CLIENT_WEB_URL}/product/${product.productSlug}},${product.productDisplayImage},${product.productPrice},${isAvailable ? "in stock" : "out of stock"},"new",${product.gender},${product.colorOptions.join("/")}\n`;
        });

        return csv;
      } else {
        this.logger.error(`Unable to find Products for Pinterest`);

        throw new UnsuccessfulException();
      }
    }
  }
}
