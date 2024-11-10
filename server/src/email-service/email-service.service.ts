import { Injectable, Logger } from "@nestjs/common";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";

// Custom Exception Filters
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

@Injectable()
export class EmailServiceService {
  private readonly logger = new Logger("EmailService");

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

  async sendOTPForNewRegistrationMailer(receiverName: string, receiverEmail: string, otpCode: string | number): Promise<{ statusCode: number; message: string }> {
    const isTransporterVerified = await this.mailerService.verifyAllTransporters();

    if (isTransporterVerified) {
      const otpMailer: ISendMailOptions = {
        from: `Fabric Fusion ${process.env.MAIL_USERNAME}`,
        to: `"${receiverName}" <${receiverEmail}>`,
        subject: "Fabric Fusion: Email Verification OTP",
        text: `OTP to Verify Email - ${otpCode}`,
        headers: {
          priority: "high",
          date: new Date().toISOString(),
        },
        // template: "./sendOTPNewRegistration",
        // context: {
        //   name: receiverName,
        //   otpCode,
        // },
      };

      return await this.mailerService
        .sendMail(otpMailer)
        .then(() => {
          return { statusCode: 200, message: "Email Sent" };
        })
        .catch(err => {
          this.logger.error(`Sending Email Error : ${JSON.stringify(err)}`);

          return { statusCode: 400, message: "Sending Email Failed" };
        });
    } else {
      this.logger.warn("Unable to Verify SMTP Transporter Connection. Please try again later.");

      throw new UnsuccessfulException("Unable to Verify SMTP Transporter Connection. Please try again later.");
    }
  }
}
