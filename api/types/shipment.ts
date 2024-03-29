import z from "zod";
import { ShipmentValidation } from "../validations";

export const SHIPMENT_STATUS = [
  "Missing Data",
  "Delivered",
  "Preparing",
  "Available",
  "Shipped",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUS)[number];

export const SHIPMENT_TYPE = ["Courrier", "Internal"] as const;

export type ShipmentType = (typeof SHIPMENT_TYPE)[number];

export type Shipment = z.infer<typeof ShipmentValidation>;

export type ShipmentSchema = Shipment & {
  _id: string;
  __v: number;
};

export type CreationShipment = Omit<Shipment, "_id" | "__v">;
