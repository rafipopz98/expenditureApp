// finance.ts

import { Schema, model, Types } from "mongoose";

// Reference to the User model using _id and email
const userRef = {
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
};

// Wallet Model
const walletSchema = new Schema({
  user: userRef,
  balance: {
    type: Number,
    default: 0,
  },
});

const Wallet = model("Wallet", walletSchema);

// Salary Model
const salarySchema = new Schema({
  user: userRef,
  amount: { type: Number, required: true },
  receivedFrom: { type: String, required: true },
  receivedDate: { type: Date, required: true },
});

const Salary = model("Salary", salarySchema);

// Debt Model
const debtSchema = new Schema({
  user: userRef,
  amount: { type: Number, required: true },
  debtor: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isEMI: { type: Boolean, default: false },
});

const Debt = model("Debt", debtSchema);

// Transaction Model
const transactionSchema = new Schema({
  user: userRef,
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const Transaction = model("Transaction", transactionSchema);

export { Wallet, Salary, Debt, Transaction };
