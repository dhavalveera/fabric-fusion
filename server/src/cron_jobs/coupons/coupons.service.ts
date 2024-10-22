import { Injectable, Logger } from "@nestjs/common";

// Cron
import { Cron, CronExpression } from "@nestjs/schedule";

// TypeORM
import { DataSource, Repository } from "typeorm";

// moment
import moment from "moment-timezone";

// Models
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";

@Injectable()
export class CronCouponsService {
  private readonly logger = new Logger("CouponsCRONService");
  private couponDetailsRepository: Repository<CouponDetailsModel>;

  constructor(private readonly dataSource: DataSource) {
    this.couponDetailsRepository = this.dataSource.getRepository(CouponDetailsModel);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async expireCoupons() {
    // Get the current date and time in UTC (or whichever timezone your app standardizes on)
    const now = moment().tz("Asia/Kolkata"); // Using UTC to match PostgreSQL's timezone

    const [rows, count] = await this.couponDetailsRepository.findAndCount({ where: { isDeleted: false, isExpired: false, isActive: true } });

    if (count > 0) {
      const couponsToExpire = rows.filter(coupon => {
        const couponExpiryDate = moment(coupon.expiryDate).tz("Asia/Kolkata"); // Parse the expiry date from the database and convert it to UTC
        return coupon.remainingQuantity <= 0 || couponExpiryDate.isBefore(now);
      });

      if (couponsToExpire.length > 0) {
        // Use a transaction for safe bulk updates
        await this.dataSource.transaction(async manager => {
          for (let i = 0; i < couponsToExpire.length; i++) {
            const couponToExpire = couponsToExpire[i];

            await manager.getRepository(CouponDetailsModel).update({ couponDetailsId: couponToExpire.couponDetailsId }, { isExpired: true, isActive: false });

            this.logger.log(
              `Coupon ${couponToExpire.code} has been expired with the Quantity ${couponToExpire.remainingQuantity} on ${moment(now).tz("Asia/Kolkata").format("DD-MMMM-YYYY, h:mm:ss a")}!.`,
            );
          }
        });
      } else {
        this.logger.log("No Coupons Found to Expire");
      }
    } else {
      this.logger.log(`No Coupons Found on ${moment(now).tz("Asia/Kolkata").format("DD-MMMM-YYYY, h:mm:ss a")}!.`);
    }
  }
}
