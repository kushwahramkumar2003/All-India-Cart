import { Supplier, Customer } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config";

export const getNewToken = async (user: Supplier |Customer ) => {
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

export default getNewToken;
