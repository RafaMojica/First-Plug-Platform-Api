import express from "express";
export const authRoutes = express.Router();

import { AuthController } from "../controllers";
import { JwtMiddleware, RefreshMiddleware } from "../middleware";

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post(
  "/refresh",
  RefreshMiddleware.canActivate,
  AuthController.refresh
);
authRoutes.post(
  "/change-password",
  JwtMiddleware.canActivate,
  AuthController.changePassword
);
