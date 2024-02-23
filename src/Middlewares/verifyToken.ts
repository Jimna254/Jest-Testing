import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, loginUserDetails } from "../Interface/user.interface";
import { sqlConfig } from "../Config/sql.config";
import { LogError } from "concurrently";
dotenv.config();

export interface ExtendedUserRequest extends Request {
  info?: loginUserDetails;
}

export const verifyToken = (
  req: ExtendedUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.token as string;

    // console.log("token (verify) -> " + JSON.stringify(token));

    if (!token) {
      return res.json({
        message: "You do not have access",
      });
    }
    const data = jwt.verify(token, "IUTR87GMHXLY") as loginUserDetails;

    req.info = data;
    // return;
  } catch (error) {
    return res.json({
      error: error,
    });
  }
  next();
};
