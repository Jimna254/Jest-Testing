import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { User } from "../Interface/user.interface";
import { sqlConfig } from "../Config/sql.config";
import bcrypt from "bcrypt";
import Connection from "../DbHelper/db.Helper";
import { registerUserSchema } from "../Validators/register.validator";
import jwt from "jsonwebtoken";


export const registerUser = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { name, email, cohort_number, password, phone_number }: User =
      req.body;

    console.log(req.body);

    let { error } = registerUserSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }

    const hashed_pwd = await bcrypt.hash(password, 5); // 5 saltRounds variable

    // Check if user exists
    const validatedresult = (
      await Connection.execute("ifUserExists", { email })
    ).recordset;

    if (validatedresult.length >= 1) {
      return res.status(503).json({ message: "This email already exists" });
    } else {
      // Insert new user
      const parameters = {
        user_id: id,
        name: name,
        email: email,
        phone_number: phone_number,
        cohort_number: cohort_number,
        password: hashed_pwd,
      };
      const result = await Connection.execute("registerUser", parameters);

      console.log(result.rowsAffected);
      return res.status(201).json({
        message: `${name} Account was created successfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};
//get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    let users = (await Connection.execute("getUsers")).recordset;
    if (users) {
      return res.json({ users });
    } else {
      return res.status(200).json({
        message: "No Users",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving users" });
  }
};

//geta user

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);
    let user = (await Connection.execute("getOneUser", { user_id: id }))
      .recordset;

    return res.json({ user });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving user" });
  }
};

//updateUser

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { name, email, phone_number, cohort_number }: User = req.body;
    console.log("User ID:", id);
    let result = await Connection.execute("updateUser", {
      user_id: id,
      name,
      email,
      phone_number,
      cohort_number,
    });
    return res.json({ result, message: "User updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(400).json({ message: "There was an issue updatinguser" });
  }
};

//deleteUser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);
    let user = (await Connection.execute("deleteUser", { user_id: id }))
      .rowsAffected;

    return res.json({ user });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting user" });
  }
};
