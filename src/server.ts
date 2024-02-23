import express, { NextFunction, Request, Response, json } from "express";
import userRouter from "./Routes/user.router";
import auth_Router from "./Routes/auth.router";

const app = express();

app.use(json());

app.use("/users", userRouter);
app.use("/users", auth_Router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

const port: number | string = process.env.PORT || 3011;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
