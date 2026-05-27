import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = null;

  console.error(err);

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if ((err as any)?.name === "ZodError") {
    statusCode = 400;
    message = "Validation Failed";
    errors = (err as any).flatten?.();
  } else if ((err as any)?.code === "23505") {
    statusCode = 409;
    message = "Resourse already exists";
  } else if ((err as any)?.code === "23503") {
    statusCode = 400;
    message = "Invalid reference";
  } else {
    message = "Something went wrong";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === "development" && {
      stack: (err as any)?.stack,
    }),
  });
};
