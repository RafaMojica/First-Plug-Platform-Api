import express from "express";
export const productRoutes = express.Router();

import { ProductController } from "../controllers";

productRoutes.get("/", ProductController.getAll);
productRoutes.get("/:id", ProductController.getById);
productRoutes.put("/:id", ProductController.update);
productRoutes.post("/", ProductController.create);
productRoutes.post("/bulkcreate", ProductController.bulkCreate);
productRoutes.delete("/:id", ProductController.delete);
