import mongoose from "mongoose";
import { DBURL } from "../config";
export const dbConnection = () => {
  mongoose
    .connect(DBURL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
