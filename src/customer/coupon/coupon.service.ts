import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, Not, Repository } from "typeorm";

// Types
import { UserType } from "src/all-types";

// Custom Exception Filters
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Model
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";
import { CouponUsageModel } from "src/admin/coupon/entities/coupon-usage.entity";
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";

// Utils
import { isCouponPriceBetween } from "src/utils/coupon-utils";
import { calculateGST, discountAmount, getAmountAfterDiscount, totalPriceWithGST, totalPriceWithoutGST } from "src/utils/calculate-order-amounts";

// DTO
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Injectable()
export class CouponService {
  private readonly logger = new Logger(`Customer${CouponService.name}`);

  private readonly couponDetailsRepository: Repository<CouponDetailsModel>;
  private readonly couponUsageRepository: Repository<CouponUsageModel>;
  private readonly orderDetailsRepository: Repository<OrderDetailsModel>;

  constructor(private readonly dataSource: DataSource) {
    this.couponDetailsRepository = this.dataSource.getRepository(CouponDetailsModel);
    this.couponUsageRepository = this.dataSource.getRepository(CouponUsageModel);
    this.orderDetailsRepository = this.dataSource.getRepository(OrderDetailsModel);
  }

  async create(createCouponDto: CreateCouponDto, userInfo: UserType) {
    const isCouponAvailable = await this.couponDetailsRepository.findOne({
      where: { code: createCouponDto.couponCode, isExpired: false, isActive: true, isDeleted: false, remainingQuantity: Not(0) },
    });

    if (isCouponAvailable) {
      const totalCouponsUsed = await this.couponUsageRepository.findOne({
        where: {
          couponDetailsFk: { couponDetailsId: isCouponAvailable.couponDetailsId },
          customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
          isDeleted: false,
        },
      });

      if (!totalCouponsUsed || totalCouponsUsed.usageCount !== isCouponAvailable.usageLimitPerUser) {
        const isPriceBetween = isCouponPriceBetween(isCouponAvailable, createCouponDto);

        if (isPriceBetween) {
          const orderDetails = await this.orderDetailsRepository.findOne({
            where: { orderDetailId: createCouponDto.orderId, orderStatus: "Pending", isDeleted: false, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } },
            relations: ["orderItemsFk", "orderItemsFk.productDetailsFk", "customerAddressFk"],
          });

          if (orderDetails) {
            // Check if the Order is CGST + SGST (Intra-State) or IGST (Inter-State)
            const isIntraState = orderDetails.customerAddressFk.state === process.env.BUSINESS_OPERATED_IN_STATE;

            let priceBeforeGST: number,
              gstAmount: number,
              priceWithGST: number,
              discountPrice: number = 0,
              priceWithDiscountWithGST: number = 0,
              totalPayable: number,
              totalItemPrice: number = 0.0;

            orderDetails.orderItemsFk.forEach(item => {
              const perProductPrice = item.perQuantityPrice * item.quantity;
              totalItemPrice += perProductPrice;

              // Step 1: Calculate Price Before GST
              priceBeforeGST = totalPriceWithoutGST(item.quantity, totalItemPrice);

              // Step 2: Calculate GST Amount
              gstAmount = calculateGST(isIntraState ? Number(item.cGstPercent) + Number(item.sGstPercent) : Number(item.iGstPercent), priceBeforeGST);

              // Step 3: Calculate Price With GST (User's Payable Amount)
              priceWithGST = totalPriceWithGST(priceBeforeGST, gstAmount);

              discountPrice = discountAmount(priceWithGST, isCouponAvailable?.discountPercentage ?? 0, isCouponAvailable?.discountAmount ?? 0);

              priceWithDiscountWithGST = getAmountAfterDiscount(priceWithGST, discountPrice);

              // Step 4: Total Payable Amount (User's Total)
              totalPayable = priceWithDiscountWithGST;
            });

            this.logger.log(
              `[${new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}] Applied Coupon Code ${createCouponDto.couponCode} & Discount Amount is (${discountPrice}) for User ${userInfo.customerDetailsId}. Order ID: ${createCouponDto.orderId}`,
            );

            return {
              message: "Coupon applied Successfully!.",
              ...orderDetails,
              pricing: {
                priceBeforeGST,
                gstAmount,
                priceWithGST,
                discountPrice,
                priceWithDiscountWithGST,
                totalPayable,
                totalItemPrice,
              },
            };
          } else {
            this.logger.warn(`No Order Details Found for Customer/User - ${userInfo.name}`);

            throw new UnsuccessfulException();
          }
        } else {
          this.logger.error(`Sorry, Coupon cannot be applied on your Bag Sub Total Amount!`);

          throw new HttpException("Sorry, Coupon cannot be applied on your Bag Sub Total Amount!", HttpStatus.FORBIDDEN);
        }
      } else {
        this.logger.error(`Coupon Code ${isCouponAvailable.code} exceed usage limit for User - (${userInfo.name})`);

        throw new HttpException(`Coupon Code ${isCouponAvailable.code} can only be used ${isCouponAvailable.usageLimitPerUser} times.`, HttpStatus.FORBIDDEN);
      }
    } else {
      this.logger.error(`Sorry, the Applied Coupon is either Expired or not available`);

      throw new NotFoundException(`Sorry, the Applied Coupon is either Expired or not available`);
    }
  }

  async findAll(): Promise<{ count: number; rows: CouponDetailsModel[] }> {
    const [rows, count] = await this.couponDetailsRepository
      .createQueryBuilder("cD")
      .select(["cD.createdAt", "cD.couponDetailsId", "cD.code", "cD.discountPercentage", "cD.discountAmount", "cD.startDate", "cD.expiryDate", "cD.minimumCartValue", "cD.maximumCartValue"])
      .where("cD.isExpired = :isExpired", { isExpired: false })
      .andWhere("cD.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("cD.remainingQuantity > 0")
      .orderBy("cD.createdAt", "DESC")
      .getManyAndCount();

    if (count > 0) {
      this.logger.log(`Found total ${count} Coupons.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Coupons Found!.`);

      throw new UnsuccessfulException();
    }
  }
}
