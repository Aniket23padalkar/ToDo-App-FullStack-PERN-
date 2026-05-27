import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import type { AuthPayload } from "../types/jwt.types.js";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError("Not authorized! No token", 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    if (typeof decoded === "string") {
      throw new AppError("Invalid token", 401);
    }

    req.user = decoded as AuthPayload;
    next();
  } catch (err) {
    next(err);
  }
};
