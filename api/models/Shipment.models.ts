import mongoose from "mongoose";
import { SHIPMENT_STATUS, SHIPMENT_TYPE } from "../types";
import { MemberSchema } from "./Member.models";

const ShipmentSchema = new mongoose.Schema(
  {
    member: {
      type: MemberSchema,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: SHIPMENT_TYPE,
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    trackingURL: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: SHIPMENT_STATUS,
      required: true,
    },
  },
  { timestamps: true }
);

export const ShipmentRepository = mongoose.model("Shipments", ShipmentSchema);
