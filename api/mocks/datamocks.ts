import { faker } from "@faker-js/faker";
import {
  User,
  ProductSchema,
  MemberSchema,
  OrderSchema,
  ShipmentSchema,
  PRODUCT_STATUSES,
  ORDER_STATUSES,
  SHIPMENT_STATUS,
} from "../types";
import { Document } from "mongoose";

export const createMockMember = (teamCount: number = 2): MemberSchema => {
  return {
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate().toISOString(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    jobPosition: faker.person.jobTitle(),
    country: faker.location.country(),
    city: faker.location.city(),
    dni: faker.person.suffix(),
    zipCode: faker.location.zipCode(),
    address: faker.location.streetAddress(),
    appartment: faker.location.secondaryAddress(),
    joiningDate: faker.date.anytime().toISOString(),
    timeSlotForDelivery: faker.date.anytime().toISOString(),
    additionalInfo: faker.lorem.text(),
    teams: [],
    __v: 0,
  };
};

// export const createMockTeam = (i: number, memberCount: number = 2): Team => {
//   return {
//     _id: faker.string.uuid(),
//     name: generateTeamName(),
//     members: Array.from({ length: memberCount }, createMockMember),
//     __v: 0,
//   };
// };

// const generateTeamName = () => {
//   const adjective = faker.commerce.productAdjective();
//   const noun = faker.commerce.product();
//   return `${adjective} ${noun} Team`;
// };

export const createMockProduct = (): ProductSchema => {
  return {
    _id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    color: faker.color.human(),
    screen: `${faker.number.int({
      min: 10,
      max: 30,
    })} inch ${faker.helpers.arrayElement(["LCD", "LED", "OLED", "QLED"])}`,
    keyboard: faker.helpers.arrayElement([
      "Mechanical",
      "Membrane",
      "Wireless",
      "Bluetooth",
    ]),
    processor: `${faker.helpers.arrayElement([
      "Intel",
      "AMD",
    ])} ${faker.lorem.word()} ${faker.number.int({ min: 1, max: 10 })}GHz`,
    ram: `${faker.number.int({ min: 4, max: 64 })}GB`,
    storage: `${faker.number.int({ min: 128, max: 2048 })}GB SSD`,
    gpu: `NVIDIA ${faker.lorem.word()} ${faker.number.int({
      min: 1,
      max: 10,
    })}GB`,
    serialNumber: faker.string.uuid(),
    status: faker.helpers.arrayElement(PRODUCT_STATUSES),
    imgUrl: faker.image.url(),
    stock: faker.number.int({ min: 0, max: 100 }),
    __v: faker.number.int(),
  };
};

export const createMockOrder = (
  memberCount: number = 2,
  productCount: number = 2
): OrderSchema => {
  return {
    _id: faker.string.uuid(),
    member: faker.person.fullName(),
    status: faker.helpers.arrayElement(ORDER_STATUSES),
    date: faker.date.anytime().toISOString(),
    total: faker.commerce.price(),
    __v: faker.number.int(),
  };
};

export const createMockShipment = (): ShipmentSchema => {
  return {
    _id: faker.string.uuid(),
    member: faker.person.firstName(),
    date: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement(SHIPMENT_STATUS),
    type: faker.helpers.arrayElement(["Courrier", "Internal"]),
    trackingNumber: faker.string.numeric(),
    trackingURL: faker.internet.url(),
    price: faker.commerce.price(),
    __v: faker.number.int(),
  };
};

export const createMockUser = (): User & Pick<Document, "_id"> => {
  return {
    tenantName: faker.company.name(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: faker.internet.avatar(),
    salt: faker.string.uuid(),
  };
};
