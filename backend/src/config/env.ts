import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "PORT",
  "NODE_ENV",
  "DB_NAME",
  "DB_HOST",
  "DB_PORT",
  "DB_PASSWORD",
  "DB_USER",
  "JWT_SECRET",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable ${key}`);
  }
});

export const config = {
  jwtSecret: process.env.JWT_SECRET as string,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
  },
  port: Number(process.env.PORT),
};
