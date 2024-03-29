import express from "express";
export const ordersRoutes = express.Router();

import { OrderController } from "../controllers";

ordersRoutes.get("/", OrderController.getAll);
ordersRoutes.get("/:id", OrderController.getById);
ordersRoutes.post("/", OrderController.create);
ordersRoutes.post("/bulkcreate", OrderController.bulkCreate);
ordersRoutes.put("/:id", OrderController.update);
ordersRoutes.delete("/:id", OrderController.delete);
