// financeController.ts

import { Request, Response } from "express";
import FinanceService from "../../service/finance";

class FinanceController {
  private financeService: FinanceService;

  constructor(financeService: FinanceService) {
    this.financeService = financeService;
    this.createSalary = this.createSalary.bind(this);
    this.createDebt = this.createDebt.bind(this);
    this.getDebt = this.getDebt.bind(this);
    this.getSalary = this.getSalary.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  public async createSalary(req: Request, res: Response) {
    const { amount, category, receivedFrom, receivedDate } = req.body;
    try {
      const { userId, email } = req?.user;
      const result = await this.financeService.createSalary({
        userId,
        email,
        amount,
        category,
        receivedFrom,
        receivedDate,
      });
      const statusCode = result.success ? 201 : 500;
      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in createSalary controller:", error);
      return res.status(500).json({ success: false, data: null, error });
    }
  }
  public async getSalary(req: Request, res: Response) {
    const userId = req.user.userId;
    console.log(userId);
    try {
      const result = await this.financeService.getSalary(userId);
      return res.json(result);
    } catch (error) {
      console.error("Error in getTransactions controller:", error);
      return res
        .status(500)
        .json({ success: false, data: null, error: "Internal Server Error" });
    }
  }
  public async createDebt(req: Request, res: Response) {
    const { amount, debtor, category, dueDate, isEMI } = req.body;
    try {
      const { userId, email } = req?.user;
      const result = await this.financeService.createDebt({
        userId,
        email,
        amount,
        debtor,
        category,
        dueDate,
        isEMI,
      });
      const statusCode = result.success ? 201 : 500;
      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in createDebt controller:", error);
      return res
        .status(500)
        .json({ success: false, data: null, error: "Internal Server Error" });
    }
  }
  public async getDebt(req: Request, res: Response) {
    const userId = req.user.userId;

    try {
      const result = await this.financeService.getDebt(userId);
      return res.json(result);
    } catch (error) {
      console.error("Error in getTransactions controller:", error);
      return res
        .status(500)
        .json({ success: false, data: null, error: "Internal Server Error" });
    }
  }
  public async getTransactions(req: Request, res: Response) {
    const userId = req.user.userId;

    try {
      const result = await this.financeService.getTransactions(userId);
      return res.json(result);
    } catch (error) {
      console.error("Error in getTransactions controller:", error);
      return res
        .status(500)
        .json({ success: false, data: null, error: "Internal Server Error" });
    }
  }
}

export default FinanceController;
