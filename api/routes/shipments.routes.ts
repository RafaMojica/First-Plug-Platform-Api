import express from "express";
export const shipmentRoutes = express.Router();

import { ShipmentsController } from "../controllers";

shipmentRoutes.get("/", ShipmentsController.getAll);
shipmentRoutes.get("/:id", ShipmentsController.getById);
shipmentRoutes.post("/", ShipmentsController.create);
shipmentRoutes.post("/bulkcreate", ShipmentsController.bulkCreate);
shipmentRoutes.delete("/:id", ShipmentsController.delete);
shipmentRoutes.put("/:id", ShipmentsController.update);
