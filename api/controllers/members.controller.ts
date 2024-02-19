import { Request, Response, NextFunction } from "express";
import { MainService } from "../services";
import { Member } from "../types";

export class MembersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const members = await mainService.runCommand("member", "getAll", {});

      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const member = await mainService.runCommand("member", "getById", id);

      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const newMember = await mainService.runCommand(
        "member",
        "create",
        req.body
      );

      res.status(201).json(newMember);
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const updatedMember = await mainService.runCommand("member", "update", {
        id,
        data: req.body,
      });

      res.status(200).json(updatedMember);
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const mainService = new MainService();

      await mainService.initalize(req.user._id);

      const deletedMember = await mainService.runCommand(
        "member",
        "delete",
        id
      );

      res.status(200).json(deletedMember);
    } catch (error) {
      next(error);
    }
  }
}
