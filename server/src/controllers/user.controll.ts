import { IUser, Token } from "@/types/user.type";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

// env mode
import dotenv from "dotenv";
dotenv.config();

export function generateToken(data: IUser): string {  
  try {
    var token = jwt.sign(
      { ...data, expired: dayjs().add(7, "day") },
      process.env.SECRET_KEY as string,
    );

    return token;
  } catch (error) {
    throw error;
  }
}

export default function (): any {
  function validateCreateUser(body: any) {
    if (!body.userName || !body.password) {
      throw "";
    }

    return true;
  }

  return { validateCreateUser, generateToken };
}
