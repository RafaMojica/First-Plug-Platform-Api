import mongoose from "mongoose";
import { ORDER_STATUSES } from "../types";
import { MemberSchema } from "./Member.models";

const OrdersSchema = new mongoose.Schema(
  {
    member: {
      type: MemberSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderRepository = mongoose.model("Orders", OrdersSchema);
