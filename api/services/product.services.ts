import { ProductCollectionValidation } from "../validations";
import { ProductRepository } from "../models";
import { CreationProduct, Product, ProductSchema } from "../types";
import { ClientSession, Types } from "mongoose";

export class ProductServices {
  static async findAllProducts() {
    return await ProductRepository.find();
  }

  static async findProductsById(productId: ProductSchema["_id"]) {
    try {
      return await ProductRepository.findById(productId);
    } catch (error) {
      throw new Error("Product not found");
    }
  }

  static async updateOneProduct({
    id,
    data,
  }: {
    id: ProductSchema["_id"];
    data: Product;
  }) {
    try {
      return await ProductRepository.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new Error("Product not found");
    }
  }

  static async createNewProduct(data: CreationProduct) {
    return await ProductRepository.create(data);
  }

  static async bulkCreate(data: CreationProduct[]) {
    ProductCollectionValidation.parse(data);
    return (await ProductRepository.insertMany(data)).length;
  }

  static async deleteProductById(productId: ProductSchema["_id"]) {
    return await ProductRepository.findOneAndRemove({ productId });
  }

  static async getAllByIds(
    productIds: ProductSchema["_id"][],
    session?: ClientSession
  ) {
    const uniqueProductIds = [...new Set(productIds)];

    let query = ProductRepository.find({ _id: { $in: uniqueProductIds } });

    if (session) {
      query = query.session(session);
    }

    const products = await query.exec();

    if (!products || products.length === 0) {
      throw new Error(`No products found for the provided IDs`);
    }

    if (products.length !== uniqueProductIds.length) {
      const foundProductIds = products.map((product) => product._id);

      const notFoundProductIds = productIds.filter((productId) => {
        const objectId = new Types.ObjectId(productId);
        return !foundProductIds.some((foundId) => foundId.equals(objectId));
      });

      throw new Error(
        `Products with IDs ${notFoundProductIds.join(", ")} not found`
      );
    }

    return products;
  }

  static async deleteMany(
    productIdsToDelete: ProductSchema["_id"][],
    session?: ClientSession
  ) {
    let query = ProductRepository.deleteMany({
      _id: { $in: productIdsToDelete },
    });

    if (session) {
      query = query.session(session);
    }

    return query.exec();
  }
}
