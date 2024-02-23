import { Router } from "express";
import {
  registerUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../Controller/user.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/:id",verifyToken,  getOneUser);
userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
export default userRouter;
