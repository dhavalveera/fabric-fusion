import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller + Service
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";

// Model
import { WishlistModel } from "./entities/wishlist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WishlistModel])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [TypeOrmModule],
})
export class WishlistModule {}
