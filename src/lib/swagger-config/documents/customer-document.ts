import type { INestApplication } from "@nestjs/common";

// Swagger Modules
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Modules
import { AuthModule } from "src/customer/auth/auth.module";
import { WishlistModule } from "src/customer/wishlist/wishlist.module";
import { AddressModule } from "src/customer/address/address.module";
import { CartModule } from "src/customer/cart/cart.module";
import { ProfileModule } from "src/customer/profile/profile.module";
import { ProductReviewsModule } from "src/customer/product-reviews/product-reviews.module";
import { RecentlyViewedModule } from "src/customer/recently-viewed/recently-viewed.module";
import { OrderModule } from "src/customer/order/order.module";
import { PaymentModule } from "src/customer/payment/payment.module";
import { CouponModule } from "src/customer/coupon/coupon.module";

export const customerDocuments = (app: INestApplication) => {
  // Customer API options
  const customerOptions = new DocumentBuilder().setTitle("Customer APIs").setDescription("All Customer related APIs").addServer("http://localhost:7080", "Local Development").addBearerAuth().build();

  // Create CUSTOMER API document
  const customerDocument = SwaggerModule.createDocument(app, customerOptions, {
    include: [AuthModule, WishlistModule, AddressModule, CartModule, ProfileModule, RecentlyViewedModule, OrderModule, PaymentModule, CouponModule, ProductReviewsModule],
  });

  // Setup Customer API Swagger UI
  SwaggerModule.setup("api-docs/customer", app, customerDocument, {
    jsonDocumentUrl: "/api-docs/customer/swagger.json",
  });
};
