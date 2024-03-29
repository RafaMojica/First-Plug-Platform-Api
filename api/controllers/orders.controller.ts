import { Request, Response, NextFunction } from "express";
import { MainService } from "../services";

export class OrderController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const orders = await mainService.runCommand("order", "getAll", {});

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const orders = await mainService.runCommand("order", "getById", id);

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const order = await mainService.runCommand("order", "create", req.body);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const rowsCreated = await mainService.runCommand(
        "order",
        "bulkCreate",
        req.body
      );

      res.status(201).json({
        message: `Bulk create successful: ${rowsCreated} documents inserted successfully out of ${req.body.length}.`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const order = await mainService.runCommand("order", "update", {
        id,
        data: req.body,
      });

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const order = await mainService.runCommand("order", "delete", id);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}
