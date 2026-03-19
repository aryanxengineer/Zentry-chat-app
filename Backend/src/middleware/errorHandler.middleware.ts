import { ErrorCodes } from "@utils/appError.js";
import { HTTP_STATUS_CODES } from "@/config/httpCodes.js";
import { AppError } from "@/utils/appError.js";
import { type ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
): any => {
  console.log(`Error occured: ${req.path} `, error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error?.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Something went wrong",
    errorCode: ErrorCodes.ERR_INTERNAL,
  });
};
