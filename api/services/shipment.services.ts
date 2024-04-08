import { ShipmentCollectionValidation } from "../validations";
import { MemberRepository, ShipmentRepository } from "../models";
import { CreationShipment, Shipment, ShipmentSchema } from "../types";

export class ShipmentServices {
  static async getAll() {
    return await ShipmentRepository.find();
  }

  static async getById(id: ShipmentSchema["_id"]) {
    const shipment = ShipmentRepository.findById(id);

    if (!shipment) {
      throw new Error("Shipment not found!");
    }

    return shipment;
  }

  static async create(data: CreationShipment) {
    return await ShipmentRepository.create(data);
  }

  static async bulkCreate(data: CreationShipment[]) {
    //TODO: used in more than one place possible refactoring
    ShipmentCollectionValidation.parse(data);

    const memberNames = data.map((shipment) => shipment.member);
    const uniqueMemberNames = [...new Set(memberNames)];

    const members = await MemberRepository.find({
      $or: uniqueMemberNames.map((fullName) => {
        const [firstName, lastName] = fullName.split(" ");
        return {
          firstName: firstName,
          lastName: lastName,
        };
      }),
    });

    const memberMap = new Map();
    members.forEach((member) => {
      memberMap.set(member.firstName + " " + member.lastName, member);
    });

    const shipmentsWithMembers = data.map((shipment) => {
      const member = memberMap.get(shipment.member);
      return { ...shipment, member: member || null };
    });

    const validShipments = shipmentsWithMembers.filter(
      (shipment) => !!shipment.member
    );

    const insertedShipments = await ShipmentRepository.insertMany(
      validShipments
    );

    return insertedShipments.length;
  }

  static async delete(id: ShipmentSchema["_id"]) {
    return await ShipmentRepository.findByIdAndDelete(id);
  }

  static async update({
    id,
    data,
  }: {
    id: ShipmentSchema["_id"];
    data: Shipment;
  }) {
    return await ShipmentRepository.findByIdAndUpdate(id, data);
  }
}
