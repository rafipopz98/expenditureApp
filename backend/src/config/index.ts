import { config } from "dotenv";

config({ path: "./.env" });

export const PORT = <string>process.env.PORT;
export const DBURL = <string>process.env.DBURL;
export const JWT_TOKEN=<string>process.env.JWT_TOKEN;
export const expires=<string>process.env.expires