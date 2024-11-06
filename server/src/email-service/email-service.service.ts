import { Injectable } from "@nestjs/common";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";

// Custom Exception Filters
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

@Injectable()
export class EmailServiceService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAnomalyAlert() {
    const mailOption: ISendMailOptions = {
      // from: "ceo-of-yahoo@yahoo.com",
      to: "abc@abc.com",
      subject: "New Login Detected from Different Location",
      text: `We noticed a new login to your account:
            Time: ${new Date()}

            If this was not you, please take action immediately.`,
      headers: {
        priority: "high",
        date: new Date().toISOString(),
      },
    };

    return await this.mailerService.sendMail(mailOption);
  }

  async sendOTPForNewRegistrationMailer(receiverName: string, receiverEmail: string, otpCode: string | number) {
    const isTransporterVerified = await this.mailerService.verifyAllTransporters();

    if (isTransporterVerified) {
      const otpMailer: ISendMailOptions = {
        to: `"${receiverName}" <${receiverEmail}>`,
        subject: "Fabric Fusion: Email Verification OTP",
        template: "./sendOTPNewRegistration",
        context: {
          name: receiverName,
          otpCode,
        },
      };

      return await this.mailerService.sendMail(otpMailer);
    } else {
      throw new UnsuccessfulException("Unable to Verify SMTP Transporter Connection. Please try again later.");
    }
  }
}
