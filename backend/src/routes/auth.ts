import express from "express";
import { protect } from "../middleware/protect.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/me", protect, getUser);

router.post("/logout", protect, logoutUser);

export default router;
