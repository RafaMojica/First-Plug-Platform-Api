import { MemberCollectionValidation, MemberValidation } from "../validations";
import { MemberRepository, ProductRepository } from "../models";
import { CreationMember, Member, MemberSchema } from "../types";
import mongoose from "mongoose";
import { ProductServices } from "./product.services";

export class MembersServices {
  static async getAll() {
    return await MemberRepository.find();
  }

  static async getById(id: MemberSchema["_id"]) {
    const Member = await MemberRepository.findById(id);

    if (!Member) {
      throw new Error("The member was not found");
    }

    return Member;
  }

  static async create(data: CreationMember) {
    MemberValidation.parse(data);
    return await MemberRepository.create(data);
  }

  static async assignManyProductsToMember({
    memberId,
    productsIds,
  }: {
    memberId: string;
    productsIds: string[];
  }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const member = await MemberRepository.findById(memberId).session(session);

      if (!member) {
        throw new Error("Member not found");
      }

      const productsToDelete = await ProductServices.getAllByIds(
        productsIds,
        session
      );

      await ProductServices.deleteMany(productsIds, session);

      member.products.push(...productsToDelete);

      await member.save({ session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async bulkCreate(data: CreationMember) {
    MemberCollectionValidation.parse(data);
    return (await MemberRepository.insertMany(data)).length;
  }

  static async update({ id, data }: { id: string; data: Member }) {
    MemberValidation.parse(data);

    const MemberUpdated = await MemberRepository.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!MemberUpdated) {
      throw new Error("The member was not found");
    }

    return MemberUpdated;
  }

  static async delete(id: MemberSchema["_id"]) {
    const MemberDeleted = await MemberRepository.findByIdAndDelete(id);

    if (!MemberDeleted) {
      throw new Error("The member was not found");
    }

    return MemberDeleted;
  }
}
