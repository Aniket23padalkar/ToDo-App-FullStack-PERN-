import { config } from "../config/env.js";
import { getUserByEmail, insertUserIntoDB } from "../repository/authRepo.js";
import type { loginData, registerData } from "../schemas/auth.schema.js";
import type { LoginResponse, SafeUser } from "../types/auth.types.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = ({ user_id, username, email_id }: SafeUser) => {
  return jwt.sign({ user_id, username, email_id }, config.jwtSecret, {
    expiresIn: "30d",
  });
};

export const registerUserService = async (
  body: registerData,
): Promise<SafeUser> => {
  const { username, email_id, password } = body;

  if (!username || !email_id || !password) {
    throw new AppError("Please Provide all the required fields", 400);
  }

  const user = await getUserByEmail(email_id);

  if (user) {
    throw new AppError("User already exists!", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const registeredUser = await insertUserIntoDB({
    username,
    email_id,
    password: hashedPassword,
  });

  return registeredUser;
};

export const loginUserService = async (
  body: loginData,
): Promise<LoginResponse> => {
  const { email_id, password } = body;

  if (!email_id || !password) {
    throw new AppError("Please provide all the required fields", 400);
  }

  const user = await getUserByEmail(email_id);

  if (!user) {
    throw new AppError("Please check your email_id and password", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Wrong password", 400);
  }

  const token = generateToken({
    user_id: user.user_id,
    username: user.username,
    email_id: user.email_id,
  });

  return {
    token,
    user: {
      user_id: user.user_id,
      username: user.username,
      email_id: user.email_id,
    },
  };
};
