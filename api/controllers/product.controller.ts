import { Request, Response, NextFunction } from "express";
import { MainService } from "../services";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const products = await mainService.runCommand("product", "getAll", {});

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const product = await mainService.runCommand("product", "getById", id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      await mainService.runCommand("product", "update", {
        id,
        data: req.body,
      });

      res.status(200).json({ message: "Product update succesfully" });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const newProduct = await mainService.runCommand(
        "product",
        "create",
        req.body
      );
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const rowsCreated = await mainService.runCommand(
        "product",
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

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const deleteProduct = await mainService.runCommand(
        "product",
        "delete",
        id
      );

      res.status(200).json(deleteProduct);
    } catch (error) {
      next(error);
    }
  }
}
