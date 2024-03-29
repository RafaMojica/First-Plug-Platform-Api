import { ORDER_STATUSES } from "../types";
import { isISODate } from "../utils";
import { z } from "zod";

export const OrderValidation = z.object({
  // TODO: this validation is done so that bulk create receives the first and last name of the member and inserts its document.
  member: z.string().min(1),
  status: z.enum(ORDER_STATUSES),
  date: z
    .string()
    .refine(isISODate, { message: "Not a valid ISO string date " }),
  total: z.string().min(1),
});

export const OrderCollectionValidation = z.array(OrderValidation);
