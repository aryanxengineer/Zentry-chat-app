import {
  HTTP_STATUS_CODES,
  type HttpStatusCodeType,
} from "@/config/httpCodes.js";

export const ErrorCodes = {
  ERR_INTERNAL: "ERR_INTERNAL",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
} as const;

export type ErrorCodeType = keyof typeof ErrorCodes;

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HttpStatusCodeType = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    public errorCode: ErrorCodeType = ErrorCodes.ERR_INTERNAL,
  ) {
    super(message);
    Error.captureStackTrace(this);
  }
}

export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error") {
    super(
      message,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      ErrorCodes.ERR_INTERNAL,
    );
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Resource not found") {
    super(message, HTTP_STATUS_CODES.NOT_FOUND, ErrorCodes.ERR_NOT_FOUND);
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request") {
    super(message, HTTP_STATUS_CODES.BAD_REQUEST, ErrorCodes.ERR_BAD_REQUEST);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized access") {
    super(
      message,
      HTTP_STATUS_CODES.UNAUTHORIEZED,
      ErrorCodes.ERR_UNAUTHORIZED,
    );
  }
}

export class ForbiddenException extends AppError {
  constructor(message = "Request Forbidden") {
    super(message, HTTP_STATUS_CODES.FORBIDDEN, ErrorCodes.ERR_FORBIDDEN);
  }
}
