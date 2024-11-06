import { Global, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

import { join } from "path";

// Controller + Service
import { EmailServiceService } from "./email-service.service";
import { EmailServiceController } from "./email-service.controller";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          port: Number(config.get("MAIL_PORT")),
          auth: {
            user: config.get("MAIL_USERNAME"),
            pass: config.get("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: `Fabric Fusion ${config.get("MAIL_USERNAME")}`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailServiceController],
  providers: [EmailServiceService],
  exports: [EmailServiceService],
})
export class EmailServiceModule {}
