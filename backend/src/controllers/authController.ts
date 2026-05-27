import type { CookieOptions, NextFunction, Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/authService.js";
import type { loginData, registerData } from "../schemas/auth.schema.js";
import { AppError } from "../utils/AppError.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, //30days
};

export const registerUser = async (
  req: Request<{}, {}, registerData>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUserService(req.body);

    res
      .status(200)
      .json({ user: result, messge: "User Registered Successfully" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request<{}, {}, loginData>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, user } = await loginUserService(req.body);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({ user, message: "Logged in Successfully" });
  } catch (err) {
    next(err);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError("Not authorized", 401);
  }

  res.json({ user: req.user });
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out Successfully" });
};
