import { Router, Application } from "express";
import FinanceService from "../../service/finance";
import FinanceController from "../controller/finance";
import { isAuth } from "../middleware/isAuth";

const finacnceRouter = Router();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const finacnceAPI = (app: Application, FS: FinanceService) => {
  const FC = new FinanceController(FS);
  //salaryy
  finacnceRouter.post("/addSalary", FC.createSalary);
  finacnceRouter.get("/getSalary", FC.getSalary);

  //debt or emi
  finacnceRouter.post("/debt", FC.createDebt);
  finacnceRouter.get("/getDebt", FC.getDebt);

  // transaction
  finacnceRouter.get("/getTransaction", FC.getTransactions);

  app.use("/fin", isAuth, finacnceRouter);
};
