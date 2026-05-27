import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3),
  email_id: z.email(),
  password: z.string().min(6),
});

export type registerData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email_id: z.email(),
  password: z.string(),
});

export type loginData = z.infer<typeof loginSchema>;
