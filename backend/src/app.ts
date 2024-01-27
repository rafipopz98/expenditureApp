import express, { NextFunction } from "express";
import { UserRepository } from "./database/repository/user";
import { UserService } from "./service/user";
import { userAPI } from "./api/routes/user";
import { Application, Request, Response } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { PORT } from "./config";
import { dbConnection } from "./database/connection";
import FinanceRepo from "./database/repository/finance";
import FinanceService from "./service/finance";
import { finacnceAPI } from "./api/routes/finance";
const ExpressApp = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieparser());

  dbConnection();
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://ee-staging.maximumaccountability.net",
      ],
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("\n", req.url);
    res.header("Access-Control-Allow-Credentials");
    next();
  });

  app.listen(PORT, () => {
    console.log(`listening at port: ${PORT}`);
  });
};

const start = () => {
  const userRepo = new UserRepository();
  const userService = new UserService(userRepo);
  const financeRepo = new FinanceRepo();
  const financeService = new FinanceService(financeRepo);

  const app = express();
  ExpressApp(app);

  userAPI(app, userService);
  finacnceAPI(app, financeService);
};
start();
