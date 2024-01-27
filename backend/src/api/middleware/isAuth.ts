import { Request, Response, NextFunction } from "express";
import { JWT_TOKEN } from "../../config/index";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessUserToken;
  if (!token) return res.status(401).send({ message: "Token not valid" });

  jwt.verify(token, JWT_TOKEN, async (err: any, data: any) => {
    if (err) return res.status(403).send({ message: "Forbidden,Login Again" });
    req.user = data;
    return next();
  });
};
