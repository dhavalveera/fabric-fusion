import { ArgumentsHost, BadRequestException, Catch, ConflictException, ExceptionFilter, HttpStatus, InternalServerErrorException, Logger } from "@nestjs/common";

// Expressjs
import type { Response } from "express";

// TypeORM
import { QueryFailedError } from "typeorm";

// types
import type { PostgreError } from "src/all-types";

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    console.log({ exception });

    const error = exception.driverError as unknown as PostgreError;
    const errorCode = error.code;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Database error occurred";

    switch (errorCode) {
      case "23505": // Unique Violation Error
        this.logger.error(`URL: ${request.originalUrl} ==> Duplicate entry. Unique constraint failed.`);
        status = HttpStatus.CONFLICT;
        message = "Duplicate entry. Unique constraint failed.";
        break;
      case "23503": // Foreign key violation
        this.logger.error(`URL: ${request.originalUrl} ==> Invalid reference. Foreign key constraint failed.`);
        status = HttpStatus.BAD_REQUEST;
        message = "Invalid reference. Foreign key constraint failed.";
        break;
      case "23502": // Not null violation
        this.logger.error(`URL: ${request.originalUrl} ==> Not Null Viloation Error. Missing required field.`);
        status = HttpStatus.BAD_REQUEST;
        message = "Missing required field.";
        break;
      case "22P02": // Invalid text representation (e.g., UUID format issue)
        this.logger.error(`URL: ${request.originalUrl} ==> Invalid input syntax. (e.g., UUID format issue)`);
        status = HttpStatus.BAD_REQUEST;
        message = "Invalid input syntax.";
        break;
      default:
        this.logger.error(`URL: ${request.originalUrl} ==>  ${error.detail} || "Unexpected database error.`);
        message = error.detail || "Unexpected database error.";
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: errorCode,
    });
  }
}
