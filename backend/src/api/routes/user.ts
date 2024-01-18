import { Router, Application } from "express";
import { UserController } from "../controller/user";
import { UserService } from "../../service/user";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const userRouter = Router();

export const userAPI = (app: Application, US: UserService) => {
  const UC = new UserController(US);

  userRouter.post("/login", UC.userLogin);
  userRouter.post("/register", UC.userRegistration);

  app.use("/user", userRouter);
};
