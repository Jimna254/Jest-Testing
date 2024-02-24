import { Request, Response } from "express";
import bcrypt from "bcrypt";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import { loginUserSchema } from "../Validators/login.validator";
import { sqlConfig } from "../Config/sql.config";

import { ExtendedUserRequest } from "../Middlewares/verifyToken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let { error } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }
    const pool = await mssql.connect(sqlConfig);

    let result = await pool
      .request()
      .input("email", email)
      .input("password", password)
      .execute("loginUser");
    let user = result.recordset[0];

    if (!user) {
      // If no user is found
      return res.status(404).json({ error: "User not found" });
    }

    // If user is found
    const correct_pwd = await bcrypt.compare(password, user.password);
    if (!correct_pwd) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const loginCredentials = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      isdeleted: user.isdeleted,
    };

    let tokenage = 60 * 60 * 24 * 4;

    const token = jwt.sign(loginCredentials, sqlConfig.SECRET, {
      expiresIn: tokenage,
    });

    return res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkdetails = async (req: ExtendedUserRequest, res: Response) => {
  // console.log("Test User", JSON.stringify(req));

  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};
