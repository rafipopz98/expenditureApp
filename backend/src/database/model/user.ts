import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "../../interface/user";

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
