// models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type ProductCategory = "laptop" | "accessory";

export interface IProduct extends Document {
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  description: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["laptop", "accessory"],
      default: "laptop",
    },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    display: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
