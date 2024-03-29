import z from "zod";
import { OrderValidation } from "../validations";

export type Order = z.infer<typeof OrderValidation>;

export type OrderSchema = {
  _id: string;
  member: string;
  status: OrderStatus;
  date: string;
  total: string;
  __v: number;
};

export const ORDER_STATUSES = [
  "Order confirmed",
  "Order canceled",
  "Confirmation pending",
  "Payment pending",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type CreationOrder = Omit<OrderSchema, "_id" | "__v">;
