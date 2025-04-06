import type { INestApplication } from "@nestjs/common";

// Swagger Modules
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Swagger Documents
import { AdminDocuments } from "./documents/admin-document";
import { customerDocuments } from "./documents/customer-document";
import { commonDocuments } from "./documents/common-documents";

export const InitiateSwagger = (app: INestApplication) => {
  // Main API Options
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Fabric Fusion APIs")
    .setDescription(
      "Fabric Fusion is a comprehensive e-commerce API built with NestJS and PostgreSQL, designed to streamline the backend operations of a clothing retail platform. It includes robust features such as user authentication, product management, order processing, and payment integration with Razorpay, providing a solid foundation for scalable and efficient online stores.",
    )

    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  // Create main API document
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: true,
  });

  // Setup main API Swagger UI with dropdown support
  SwaggerModule.setup("api-docs", app, documentFactory, {
    customSiteTitle: "Fabric Fusion - API Documentation",
    customfavIcon: "/public/logo/Fabric_Fusion_Logo_SVG.svg",
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          name: "1. Admin APIs",
          url: "api-docs/admin/swagger.json",
        },
        {
          name: "2. Customer APIs",
          url: "api-docs/customer/swagger.json",
        },
        {
          name: "3. Common APIs",
          url: "api-docs/common/swagger.json",
        },
      ],
      defaultModelsExpandDepth: -1, // Hides the "Schemas" section
    },
    jsonDocumentUrl: "/api-docs/swagger.json",
  });

  // Admin Document
  AdminDocuments(app);

  // Customer Document
  customerDocuments(app);

  // Common (Unprotected) Document
  commonDocuments(app);
};
