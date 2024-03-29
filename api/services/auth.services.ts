import { LoginUser, UserJWT } from "../types";
import { UserService } from "./user.services";
import { generateHash, validatePassword } from "../utils";
import { JWTtoken } from "../config";
import bcrypt from "bcrypt";

const EXPIRE_TIME = 20 * 1000;
export class AuthServices {
  static async login(dto: LoginUser) {
    const user = await AuthServices.validateUser(dto);

    const { _id, email, name, image } = user;

    const payload: UserJWT = {
      _id: _id.toString(),
      email,
      name,
      image,
    };

    return {
      user,
      backendTokens: {
        accessToken: await JWTtoken.generateToken(payload, {
          expiresIn: "1h",
          secret: "JWTSECRETKEY",
        }),

        refreshToken: await JWTtoken.generateToken(payload, {
          expiresIn: "7h",
          secret: "JWTREFRESHTOKENKEY",
        }),
        expireIn: new Date().setTime(new Date().getTime()) * EXPIRE_TIME,
      },
    };
  }

  static async validateUser(dto: LoginUser) {
    const user = await UserService.getByEmail(dto.email);

    if (!user) throw new Error("Unauthorized");

    const authorized = await validatePassword(
      { salt: user.salt, password: user.password },
      dto.password
    );

    if (authorized) {
      return user;
    }

    throw new Error("Unauthorized");
  }

  static async refreshToken(user: UserJWT) {
    const { _id, email, name, image } = user;

    const payload: UserJWT = {
      _id: _id?.toString(),
      email,
      name,
      image,
    };

    return {
      accessToken: await JWTtoken.generateToken(payload, {
        expiresIn: "1h",
        secret: "JWTSECRETKEY",
      }),
      refreshToken: await JWTtoken.generateToken(payload, {
        expiresIn: "7h",
        secret: "JWTREFRESHTOKENKEY",
      }),
      expireIn: new Date().setTime(new Date().getTime()) * EXPIRE_TIME,
    };
  }

  static async changePassword({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: LoginUser["password"];
  }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await generateHash(newPassword, salt);

    return await UserService.update(userId, {
      password: hashedPassword,
      salt,
    });
  }
}
