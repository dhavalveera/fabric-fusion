import type { INestApplication } from "@nestjs/common";

// Swagger Modules
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Modules
import { CommonModule } from "src/customer/common/common.module";
import { SearchModule } from "src/customer/search/search.module";

export const commonDocuments = (app: INestApplication) => {
  // Common API options
  const commonOptions = new DocumentBuilder().setTitle("Common APIs").setDescription("All Common related APIs").addServer("http://localhost:7080", "Local Development").build();

  // Create Common API document
  const commonDocument = SwaggerModule.createDocument(app, commonOptions, {
    include: [CommonModule, SearchModule],
  });

  // Setup Common API Swagger UI
  SwaggerModule.setup("api-docs/common", app, commonDocument, {
    jsonDocumentUrl: "/api-docs/common/swagger.json",
  });
};
