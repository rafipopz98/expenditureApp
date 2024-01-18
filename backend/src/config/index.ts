import { config } from "dotenv";

config({ path: "./.env" });

export const PORT = <string>process.env.PORT;