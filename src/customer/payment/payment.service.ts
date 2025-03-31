import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Not, Repository } from "typeorm";

// Types
import { UserType } from "src/all-types";

// Utils Service
import { UtilsServiceService } from "src/payment-utils/payment-utils.service";

// RazorPay
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { Payments } from "razorpay/dist/types/payments";

// Custom Exception FIlters
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Models
import { CouponDetailsModel } from "src/admin/coupon/entities/coupon.entity";
import { CouponUsageModel } from "src/admin/coupon/entities/coupon-usage.entity";
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { CartsModel } from "../cart/entities/cart.entity";
import { PaymentDetailsModel } from "./entities/payment.entity";

// CONSTANTS
import { CartStatus } from "../cart/constants";

// DTO
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  private logger = new Logger(`Customer${PaymentService.name}`);

  private readonly couponDetailsRepository: Repository<CouponDetailsModel>;
  private readonly couponUsageRepository: Repository<CouponUsageModel>;
  private readonly orderDetailsRepository: Repository<OrderDetailsModel>;
  private readonly cartsRepository: Repository<CartsModel>;

  constructor(
    @InjectRepository(PaymentDetailsModel) private readonly paymentDetailsRepository: Repository<PaymentDetailsModel>,
    private readonly dataSource: DataSource,
    private readonly utilsService: UtilsServiceService,
  ) {
    this.couponDetailsRepository = this.dataSource.getRepository(CouponDetailsModel);
    this.couponUsageRepository = this.dataSource.getRepository(CouponUsageModel);
    this.orderDetailsRepository = this.dataSource.getRepository(OrderDetailsModel);
    this.cartsRepository = this.dataSource.getRepository(CartsModel);
  }

  async create(createPaymentDto: CreatePaymentDto, userInfo: UserType) {
    const orderDetails = await this.orderDetailsRepository
      .createQueryBuilder("oD")
      .leftJoinAndSelect("oD.orderItemsFk", "oI")
      .leftJoinAndSelect("oI.productDetailsFk", "pD")
      .leftJoinAndSelect("oD.customerAddressFk", "cA")
      .select([
        "oD.isDeleted",
        "oD.createdAt",
        "oD.updatedAt",
        "oD.orderDetailId",
        "oD.discountAmount",
        "oD.totalAmount",
        "oD.orderStatus",
        "oD.orderDate",
        "oI.isDeleted",
        "oI.createdAt",
        "oI.updatedAt",
        "oI.orderItemId",
        "oI.quantity",
        "oI.perQuantityPrice",
        "oI.totalAmount",
        "oI.cGstPercent",
        "oI.totalCgstAmount",
        "oI.sGstPercent",
        "oI.totalSgstAmount",
        "oI.iGstPercent",
        "oI.totalIgstAmount",
        "pD.productDetailsId",
        "pD.productName",
        "pD.productPrice",
        "pD.productDisplayImage",
        "cA.customerAddressId",
        "cA.firstName",
        "cA.lastName",
        "cA.phoneNumber",
        "cA.address",
        "cA.city",
        "cA.state",
        "cA.pinCode",
        "cA.addressType",
      ])
      .where("oD.orderDetailId = :orderDetailId", { orderDetailId: createPaymentDto.orderId })
      .andWhere("oD.orderStatus = :orderStatus", { orderStatus: "Pending" })
      .andWhere("oD.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("oD.customerDetailsFk.customerDetailsId = :customerDetailsId", { customerDetailsId: userInfo.customerDetailsId })
      .orderBy("oI.createdAt", "DESC")
      .getOne();

    let isCouponAvailable: CouponDetailsModel;
    if (createPaymentDto.couponId) {
      isCouponAvailable = await this.couponDetailsRepository.findOne({ where: { couponDetailsId: createPaymentDto.couponId, isExpired: false, isDeleted: false, remainingQuantity: Not(0) } });
    }

    if (orderDetails) {
      // Check if the Order is CGST + SGST (Intra-State) or IGST (Inter-State)
      const isIntraState = orderDetails.customerAddressFk.state === process.env.BUSINESS_OPERATED_IN_STATE;

      const { discountPrice, gstAmount, paymentGatewayValue, priceBeforeGST, priceWithDiscountWithGST, storeRevenue, totalPayable } = this.utilsService.getPriceBreakupDetails(
        orderDetails,
        isCouponAvailable,
        isIntraState,
      );

      const razorPayData = await this.utilsService.completePaymentEntryFunction(totalPayable);

      const createdPaymentData = this.paymentDetailsRepository.create({
        baseAmount: isCouponAvailable ? priceWithDiscountWithGST : priceBeforeGST,
        gstAmount,
        paymentGatewayAmount: paymentGatewayValue,
        paymentIntegrator: "Razorpay",
        paymentStatus: razorPayData.status,
        paymentIntent_orderId: razorPayData.id,
        totalPayableAmount: totalPayable,
        couponValue: discountPrice || 0,
        deliveryCost: 0,
        storeRevenue,
        orderDetailsFk: { orderDetailId: createPaymentDto.orderId },
        couponDetailsFk: createPaymentDto.couponId ? { couponDetailsId: createPaymentDto.couponId } : null,
        customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
        paymentMethod: "Online",
      });

      const paymentData = await this.paymentDetailsRepository.save(createdPaymentData);

      if (paymentData) {
        this.logger.log(`Created Payment Successfully!..`);

        throw new CreatedException();
      } else {
        this.logger.warn(`Unable to create Payment Detail. Please try again later.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Order Found for Order ID - (${createPaymentDto.orderId})`);

      throw new NotFoundException(`No Order Found for Order ID - (${createPaymentDto.orderId})`);
    }
  }

  async razorPayPaymentWebhook(payload: Payments.RazorpayPayment, razorpaySignature: string) {
    if (payload) {
      const orderId = payload.order_id;

      if (orderId) {
        const verifyRazorPaySignature = validateWebhookSignature(JSON.stringify(payload), razorpaySignature, process.env.RAZORPAY_WEBHOOK_SECRET_KEY);

        if (verifyRazorPaySignature) {
          // Update the `paymentStatus`
          await this.paymentDetailsRepository.update(
            { paymentIntent_orderId: orderId },
            {
              paymentStatus: payload.status,
              paymentResponseRecieved: JSON.stringify(payload),
            },
          );
        }
      } else {
        this.logger.log(`Line # 166, OK`);

        throw new SuccessException("OK");
      }
    }

    const date = new Date();

    this.logger.log(`webhook downtime ${date}`);

    throw new SuccessException("OK");
  }

  async verifyRazorPayPayment(paymentId: string, userInfo: UserType) {
    const {
      paymentDetailsId,
      paymentIntent_orderId,
      couponDetailsFk,
      orderDetailsFk: { orderDetailId },
      customerDetailsFk: { firstName, lastName },
    } = await this.paymentDetailsRepository.findOne({
      where: { paymentDetailsId: paymentId, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } },
      relations: ["couponDetailsFk", "orderDetailsFk", "customerDetailsFk"],
    });

    if (paymentDetailsId) {
      const razorPayOrderDetails = await this.utilsService.fetchRazorPayOder(paymentIntent_orderId);

      switch (razorPayOrderDetails.status) {
        case "paid":
          // Update PaymentStatus
          const updatedPaymentData = await this.paymentDetailsRepository.update(
            { paymentDetailsId: paymentId },
            { paymentStatus: "Completed", paymentResponseRecieved: JSON.stringify(razorPayOrderDetails) },
          );

          if (updatedPaymentData) {
            if (couponDetailsFk) {
              // Fetch Coupon Detail & Update Quantity
              const couponData = await this.couponDetailsRepository.findOne({ where: { couponDetailsId: couponDetailsFk.couponDetailsId } });

              await this.couponDetailsRepository.update({ couponDetailsId: couponDetailsFk.couponDetailsId }, { remainingQuantity: couponData.remainingQuantity - 1 });

              const couponUsageData = await this.couponUsageRepository.findOne({ where: { couponDetailsFk: { couponDetailsId: couponDetailsFk.couponDetailsId } } });

              await this.couponUsageRepository.update({ couponDetailsFk: { couponDetailsId: couponDetailsFk.couponDetailsId } }, { usageCount: couponUsageData.usageCount + 1 });
            }

            await this.cartsRepository.update({ orderDetailsFk: { orderDetailId } }, { cartStatus: CartStatus.Completed });
            await this.orderDetailsRepository.update({ orderDetailId }, { orderStatus: "Order Confirmed" });

            this.logger.log(`Payment Completed (Paid) for Customer/User - (${firstName} ${lastName}) for Order - (${orderDetailId})`);

            throw new SuccessException();
          } else {
            this.logger.warn(`Unable to Update Payment Details for Payment ID - (${paymentId})`);

            throw new UnsuccessfulException();
          }

        case "created":
          await this.paymentDetailsRepository.update({ paymentDetailsId: paymentId }, { paymentStatus: "Created", paymentResponseRecieved: JSON.stringify(razorPayOrderDetails) });

          this.logger.log(`Line # 230. Payment Created/Required. Customer/User ${firstName} ${lastName} has to complete the Pending Payment.`);

          throw new HttpException("Payment Created", HttpStatus.PAYMENT_REQUIRED);

        case "attempted":
          await this.paymentDetailsRepository.update({ paymentDetailsId: paymentId }, { paymentStatus: "Attempted", paymentResponseRecieved: JSON.stringify(razorPayOrderDetails) });

          this.logger.log(`Line # 237, Payment Created/Required. Customer/User ${firstName} ${lastName} has to complete the Pending Payment.`);

          throw new HttpException("Payment Created", HttpStatus.PAYMENT_REQUIRED);
      }
    } else {
      this.logger.error(`No Payment Details Found for Payment ID - ${paymentId}`);

      throw new NotFoundException(`No Payment Details Found!.`);
    }
  }
}
