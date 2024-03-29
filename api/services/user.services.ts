import { User, CreationUser } from "../types";
import { UserRepository } from "../models";
import { Types } from "mongoose";

export class UserService {
  static async getById(id: string) {
    return await UserRepository.findOne({
      _id: new Types.ObjectId(id),
    }).exec();
  }

  static async getByEmail(email: User["email"]) {
    return await UserRepository.findOne({ email }).exec();
  }

  static async create(dto: CreationUser) {
    const user = await UserService.getByEmail(dto.email);

    if (user) throw new Error("email duplicated");

    await UserRepository.create(dto);
  }

  static async update(userId: string, data: Partial<User>) {
    return UserRepository.findByIdAndUpdate(userId, data);
  }
}
