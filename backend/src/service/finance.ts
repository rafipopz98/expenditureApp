// financeService.ts

import FinanceRepo from "../database/repository/finance";

class FinanceService {
  private financeRepo: FinanceRepo;

  constructor(financeRepo: FinanceRepo) {
    this.financeRepo = financeRepo;
  }

  async createSalary({
    userId,
    email,
    amount,
    category,
    receivedFrom,
    receivedDate,
  }: {
    userId: string;
    email: string;
    amount: number;
    category: string;
    receivedFrom: string;
    receivedDate: Date;
  }) {
    try {
      const result = await this.financeRepo.createSalary({
        userId,
        email,
        amount,
        receivedFrom,
        receivedDate,
      });
      if (result.success && result.data) {
        await this.financeRepo.updateBalance(userId, amount);
        await this.financeRepo.createTransaction({
          userId,
          amount,
          email,
          category,
          type: "Credit",
          date: new Date(),
          description: `Received salary from ${receivedFrom}`,
        });
      }
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error in createSalary service:", error);
      return { success: false, data: null, error };
    }
  }
  async getSalary(userId: string) {
    try {
      const result = await this.financeRepo.getSalary(userId);
      return result;
    } catch (error) {
      console.error("Error in getTransactions service:", error);
      return { success: false, data: null, error };
    }
  }
  async createDebt({
    userId,
    email,
    amount,
    debtor,
    category,
    dueDate,
    isEMI,
  }: {
    userId: string;
    email: string;
    amount: number;
    debtor: string;
    category: string;
    dueDate: Date;
    isEMI: boolean;
  }) {
    try {
      // Fetch the user's current balance
      const currentBalance = await this.financeRepo.getBalance(userId);

      if (currentBalance >= amount) {
        // If the user has sufficient balance, create the debt and deduct the amount from the wallet
        const result = await this.financeRepo.createDebt({
          userId,
          email,
          amount,
          debtor,
          dueDate,
          isEMI,
        });

        if (result.success) {
          await this.withdraw(userId, amount);
          await this.financeRepo.createTransaction({
            userId,
            email,
            amount,
            category,
            type: "Debit",
            date: new Date(), // You might want to use the actual payment date here
            description: `Paid debt to ${debtor}`,
          });
        }

        return result;
      } else {
        // Insufficient funds to create the debt
        return {
          success: false,
          data: null,
          error: "Insufficient funds to create the debt",
        };
      }
    } catch (error) {
      console.error("Error in createDebt service:", error);
      return { success: false, data: null, error };
    }
  }
  async getDebt(userId: string) {
    try {
      const result = await this.financeRepo.getDebt(userId);
      return result;
    } catch (error) {
      console.error("Error in getTransactions service:", error);
      return { success: false, data: null, error };
    }
  }

  async withdraw(userId: string, amount: number) {
    try {
      const currentBalance = await this.financeRepo.getBalance(userId);

      if (currentBalance >= amount) {
        const newBalance = await this.financeRepo.updateBalance(
          userId,
          -amount
        );
        return { success: true, data: { balance: newBalance }, error: null };
      } else {
        throw new Error("Insufficient funds");
      }
    } catch (error) {
      console.error("Error in withdraw method of WalletService:", error);
      return { success: false, data: null, error };
    }
  }
  async getTransactions(userId: string) {
    try {
      const result = await this.financeRepo.getTransactions(userId);
      return result;
    } catch (error) {
      console.error("Error in getTransactions service:", error);
      return { success: false, data: null, error };
    }
  }
}

export default FinanceService;
