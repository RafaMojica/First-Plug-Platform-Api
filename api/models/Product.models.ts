import { PRODUCT_STATUSES } from "../types";
import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  category: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: false,
    default: "",
  },
  screen: {
    type: String,
    require: false,
    default: "",
  },
  keyboard: {
    type: String,
    require: false,
    default: "",
  },
  processor: {
    type: String,
    require: false,
    default: "",
  },
  ram: {
    type: String,
    require: false,
    default: "",
  },
  storage: {
    type: String,
    require: false,
    default: "",
  },
  gpu: {
    type: String,
    require: false,
    default: "",
  },
  serialNumber: {
    type: String,
    require: false,
    default: "",
  },
  status: {
    type: String,
    enum: PRODUCT_STATUSES,
    require: true,
  },
  imgUrl: {
    type: String,
    required: false,
    default: "",
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const ProductRepository = mongoose.model("Products", ProductsSchema);
