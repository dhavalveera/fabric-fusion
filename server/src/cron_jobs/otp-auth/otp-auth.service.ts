import { Injectable, Logger } from "@nestjs/common";

// Cron
import { Cron, CronExpression } from "@nestjs/schedule";

// TypeORM
import { DataSource, LessThan, Repository } from "typeorm";

// moment
import moment from "moment-timezone";

// Model
import { AuthOtpModel } from "src/auth-otp/entities/auth-otp.entity";

@Injectable()
export class OtpAuthService {
  private readonly logger = new Logger("CouponsCRONService");
  private authOtpRepository: Repository<AuthOtpModel>;

  constructor(private readonly dataSource: DataSource) {
    this.authOtpRepository = this.dataSource.getRepository(AuthOtpModel);
  }

  @Cron(CronExpression.EVERY_HOUR, { timeZone: "Asia/Kolkata", name: "Delete Expired & isVerified OTP CRON" })
  async deleteAuthOTP() {
    // Get the current date and time in UTC (or whichever timezone your app standardizes on)
    const now = moment().tz("Asia/Kolkata"); // Using UTC to match PostgreSQL's timezone

    const currentTime = new Date();

    const [rows, count] = await this.authOtpRepository.findAndCount({ where: { expiresAt: LessThan(currentTime), isVerified: true } });

    if (count > 0) {
      await this.dataSource.transaction(async manager => {
        for (let i = 0; i < rows.length; i++) {
          const otpToDelete = rows[i];

          await manager.getRepository(AuthOtpModel).delete({ otpVerificationId: otpToDelete.otpVerificationId });

          this.logger.log(`2FA OTP => ${otpToDelete.otp} has been Deleted on ${moment(now).tz("Asia/Kolkata").format("DD-MMMM-YYYY, h:mm:ss a")}!.`);
        }
      });
    } else {
      this.logger.log(`No 2FA OTP Found on ${moment(now).tz("Asia/Kolkata").format("DD-MMMM-YYYY, h:mm:ss a")} to DELETE!.`);
    }
  }
}
