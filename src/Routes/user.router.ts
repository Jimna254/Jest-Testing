import { Router } from "express";
import {
  registerUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../Controller/user.Controller";

const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getOneUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
export default userRouter;
