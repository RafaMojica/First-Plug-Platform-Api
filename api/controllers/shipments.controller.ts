import { Request, Response, NextFunction } from "express";
import { MainService } from "../services";
export class ShipmentsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const shipments = await mainService.runCommand("shipment", "getAll", {});

      res.status(200).json(shipments);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const shipment = await mainService.runCommand("shipment", "getById", id);

      res.status(200).json(shipment);
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const newShipment = await mainService.runCommand(
        "shipment",
        "create",
        req.body
      );

      res.status(201).json(newShipment);
    } catch (error) {
      next(error);
    }
  }
  static async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const rowsCreated = await mainService.runCommand(
        "shipment",
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

      const shipmentUpdated = await mainService.runCommand(
        "shipment",
        "update",
        { id, data: req.body }
      );

      res.status(200).json(shipmentUpdated);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const shipmentDeleted = await mainService.runCommand(
        "shipment",
        "delete",
        id
      );

      res.status(200).json(shipmentDeleted);
    } catch (error) {
      next(error);
    }
  }
}
