// financeRepo.ts

import { Debt, Salary, Transaction, Wallet } from "../model/finance";

class FinanceRepo {
  async createSalary({
    userId,
    email,
    amount,
    receivedFrom,
    receivedDate,
  }: {
    userId: string;
    email: string;
    amount: number;
    receivedFrom: string;
    receivedDate: Date;
  }) {
    try {
      const salary = await Salary.create({
        user: { userId, email },
        amount,
        receivedFrom,
        receivedDate,
      });
      return { success: true, data: salary, error: null };
    } catch (error) {
      console.error("Error while creating salary in FinanceRepo:", error);
      return { success: false, data: null, error };
    }
  }
  async updateBalance(userId: string, amount: number) {
    try {
      const wallet = await Wallet.findOneAndUpdate(
        { "user.userId": userId },
        { $inc: { balance: amount } },
        { new: true, upsert: true }
      );

      return wallet ? wallet.balance : 0;
    } catch (error) {
      console.error("Error in updateBalance method of WalletRepo:", error);
      throw error; // Propagate the error to the service layer
    }
  }
  async getSalary(userId: string) {
    try {
      const transactions = await Salary.find({
        "user.userId": userId,
      }).sort({ date: "desc" });
      return { success: true, data: transactions, error: null };
    } catch (error) {
      console.error(
        "Error while fetching transactions in TransactionRepo:",
        error
      );
      return { success: false, data: null, error };
    }
  }
  async createDebt({
    userId,
    email,
    amount,
    debtor,
    dueDate,
    isEMI,
  }: {
    userId: string;
    email: string;
    amount: number;
    debtor: string;
    dueDate: Date;
    isEMI: boolean;
  }) {
    try {
      const result = await Debt.create({
        user: { userId, email },
        amount,
        debtor,
        dueDate,
        isEMI,
      });
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error while creating debt in FinanceRepo:", error);
      return { success: false, data: null, error };
    }
  }
  async getDebt(userId: string) {
    try {
      const transactions = await Debt.find({
        "user.userId": userId,
      }).sort({ date: "desc" });
      return { success: true, data: transactions, error: null };
    } catch (error) {
      console.error(
        "Error while fetching transactions in TransactionRepo:",
        error
      );
      return { success: false, data: null, error };
    }
  }
  async getBalance(userId: string) {
    try {
      const wallet = await Wallet.findOne({ "user.userId": userId });
      return wallet ? wallet.balance : 0;
    } catch (error) {
      console.error("Error in getBalance method of WalletRepo:", error);
      throw error; // Propagate the error to the service layer
    }
  }
  async createTransaction({
    userId,
    amount,
    email,
    category,
    type,
    date,
    description,
  }: {
    userId: string;
    email: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
    description: string;
  }) {
    try {
      const transactionDescription = `${
        type === "Credit" ? "Received" : "Paid"
      } ${amount}rs ${category} on ${date.toDateString()} - ${description}`;
      const result = await Transaction.create({
        user: { userId, email },
        amount,
        category,
        type,
        date,
        description: transactionDescription,
      });

      return { success: true, data: result, error: null };
    } catch (error) {
      console.error(
        "Error while creating transaction in TransactionRepo:",
        error
      );
      return { success: false, data: null, error };
    }
  }
  async getTransactions(userId: string) {
    try {
      const transactions = await Transaction.find({
        "user.userId": userId,
      }).sort({ date: "desc" });
      return { success: true, data: transactions, error: null };
    } catch (error) {
      console.error(
        "Error while fetching transactions in TransactionRepo:",
        error
      );
      return { success: false, data: null, error };
    }
  }
}

export default FinanceRepo;
