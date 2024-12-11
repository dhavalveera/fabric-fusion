import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// RazorPay
import Razorpay from "razorpay";
import type { Orders } from "razorpay/dist/types/orders";

// crypto
import { createHmac } from "crypto";

// Types
import type { GetPriceBreakDetailsType } from "src/all-types";

// Model
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";

// Util Functions
import { calculateGST, calculatePaymentGatewayFee, discountAmount, getAmountAfterDiscount, totalPriceWithGST, totalPriceWithoutGST } from "src/utils/calculate-order-amounts";
import { nanoid } from "src/utils/generate-nanoid";

@Injectable()
export class UtilsServiceService {
  private readonly razorpayInstance: Razorpay;

  constructor(private readonly configService: ConfigService) {
    this.razorpayInstance = new Razorpay({
      key_id: this.configService.get("RAZORPAY_KEY_ID"),
      key_secret: this.configService.get("RAZORPAY_KEY_SECRET"),
    });
  }

  getPriceBreakupDetails(orderDetails: OrderDetailsModel, isCouponAvailable: CouponDetailsModel, isIntraState: boolean): GetPriceBreakDetailsType {
    let priceBeforeGST: number,
      gstAmount: number,
      priceWithGST: number,
      discountPrice: number = 0,
      priceWithDiscountWithGST: number = 0,
      paymentGatewayValue: number,
      totalPayable: number,
      totalItemPrice: number = 0.0,
      storeRevenue: number;

    orderDetails.orderItemsFk.forEach(item => {
      const perProductPrice = item.perQuantityPrice * item.quantity;
      totalItemPrice += perProductPrice;

      // Step 1: Calculate Price Before GST
      priceBeforeGST = totalPriceWithoutGST(item.quantity, totalItemPrice);

      // Step 2: Calculate GST Amount
      gstAmount = calculateGST(isIntraState ? Number(item.cGstPercent) + Number(item.sGstPercent) : Number(item.iGstPercent), priceBeforeGST);

      // Step 3: Calculate Price With GST (User's Payable Amount)
      priceWithGST = totalPriceWithGST(priceBeforeGST, gstAmount);

      discountPrice = discountAmount(priceWithGST, isCouponAvailable?.discountPercentage ?? 0);

      priceWithDiscountWithGST = getAmountAfterDiscount(priceWithGST, discountPrice);

      // Step 4: Total Payable Amount (User's Total)
      totalPayable = priceWithDiscountWithGST;

      // Step 5: Calculate Payment Gateway Fee for Store Owner
      paymentGatewayValue = calculatePaymentGatewayFee(Number(process.env.RAZORPAY_PERCENTAGE), priceWithGST);

      // Optional: Deduct Payment Gateway Fee from Store Revenue
      storeRevenue = totalPayable - paymentGatewayValue;
    });

    return {
      discountPrice,
      gstAmount,
      paymentGatewayValue,
      priceBeforeGST,
      priceWithDiscountWithGST,
      priceWithGST,
      storeRevenue,
      totalItemPrice,
      totalPayable,
    };
  }

  async fetchRazorPayOder(orderId: string): Promise<Orders.RazorpayOrder> {
    return this.razorpayInstance.orders.fetch(orderId);
  }

  async razorPaySignatureCheck(reqBody: any) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET_KEY;
    const shasum = createHmac("sha256", secret);
    shasum.update(JSON.stringify(reqBody));
    return shasum.digest("hex");
  }

  async completePaymentEntryFunction(totalPayable: number): Promise<Orders.RazorpayOrder> {
    // Setting the Currency and payment_capture = 1 ( for automatic payment capture )
    const payment_capture = 1;
    const options = {
      amount: Number(totalPayable) * 100,
      currency: "INR",
      receipt: nanoid(),
      payment_capture,
    };

    const razorPayOrderDetails = await this.razorpayInstance.orders.create(options);

    return razorPayOrderDetails;
  }
}
