import { Controller, Post, Body, Req, Get, Param } from "@nestjs/common";

// RazorPay

// Decorator
import { SkipAuth } from "src/admin/auth/decorators/public.decorator";
import { UserInRequest } from "src/admin/auth/decorators/user.decorator";

// Custom Header
import { Header } from "src/middleware/get-req-header";

// Types
import { RazorPayPaymentType, UserType } from "src/all-types";

// Service
import { PaymentService } from "./payment.service";

// DTO
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Controller("user/payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("create")
  create(@Body() createPaymentDto: CreatePaymentDto, @UserInRequest() userInfo: UserType) {
    return this.paymentService.create(createPaymentDto, userInfo);
  }

  @SkipAuth()
  @Post("razorpay/webhook")
  razorPayPaymentWebhookController(@Req() req: Request, @Header("x-razorpay-signature") razorpaySignature: string, @Body() payload: RazorPayPaymentType) {
    return this.paymentService.razorPayPaymentWebhook(payload, razorpaySignature);
  }

  @Get("razorpay/:paymentId/payment/verify")
  verifyRazorPayPayment(@Param("paymentId") paymentId: string, @UserInRequest() userInfo: UserType) {
    return this.paymentService.verifyRazorPayPayment(paymentId, userInfo);
  }
}
