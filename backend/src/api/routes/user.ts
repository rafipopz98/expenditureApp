import { Router, Application } from "express";
import { UserController } from "../controller/user";
import { UserService } from "../../service/user";


const userRouter = Router();

export const userAPI = (app: Application, US: UserService) => {
  const UC = new UserController(US);

  userRouter.post("/login", UC.userLogin);

  app.use("/user", userRouter);
};
