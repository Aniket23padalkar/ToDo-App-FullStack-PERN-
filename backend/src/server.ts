import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { config } from "./config/env.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
