import type { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  user_id: number;
  username: string;
  email_id: string;
}
