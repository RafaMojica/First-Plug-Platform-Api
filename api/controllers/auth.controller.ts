import { NextFunction, Request, Response } from "express";

import { MainService } from "../services";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize();

      await mainService.runCommand("user", "create", req.body);

      res.status(201).json("User created");
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize();

      const { email, password } = req.body;

      const payload = await mainService.runCommand("auth", "login", {
        email,
        password,
      });

      res.send(payload);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize();

      const payload = await mainService.runCommand(
        "auth",
        "refreshToken",
        req.user.data
      );

      res.send(payload);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize();

      await mainService.runCommand("auth", "changePassword", {
        userId: req.user._id,
        newPassword: req.body.password,
      });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
