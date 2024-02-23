import { Router } from "express";
import { loginUser, checkdetails } from "../Controller/auth.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_Router = Router();
auth_Router.post("/checkdetails", verifyToken, checkdetails);
auth_Router.post("/login", loginUser);

export default auth_Router;
