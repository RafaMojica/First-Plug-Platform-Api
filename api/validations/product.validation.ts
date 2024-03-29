import { PRODUCT_STATUSES } from "../types";
import { z } from "zod";

export const ProductValidation = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  color: z.string().nullable(),
  screen: z.string().nullable(),
  keyboard: z.string().nullable(),
  processor: z.string().nullable(),
  ram: z.string().nullable(),
  storage: z.string().nullable(),
  gpu: z.string().nullable(),
  serialNumber: z.string().nullable(),
  status: z.enum(PRODUCT_STATUSES),
  imgUrl: z.string().optional(),
  stock: z.number(),
});

export const ProductCollectionValidation = z.array(ProductValidation);
