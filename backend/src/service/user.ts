import { UserRepository } from "../database/repository/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_TOKEN, expires } from "../config/index";
import { ObjectId, Types } from "mongoose";
class UserService {
  UserRepo: UserRepository;
  constructor(UR: UserRepository) {
    this.UserRepo = UR;
  }

  private CreateAuthIDs({
    userId,
    email,
    expires,
  }: {
    userId: Types.ObjectId;
    email: string;
    expires: string;
  }) {
    try {
      const token = jwt.sign({ userId, email }, JWT_TOKEN, {
        expiresIn: expires,
      });
      return { success: true, data: token, error: null };
    } catch (error) {
      return { success: false, data: null, error };
    }
  }

  public async userLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const userExists = await this.UserRepo.checkEmail({ email });
      console.log(userExists, "1");
      if (userExists.data) {
        // User exists, verify password
        const { data } = userExists;
        const passwordMatch = await bcrypt.compare(
          password,
          data?.password || ""
        );

        if (data && passwordMatch) {
          // Passwords match, successful login
          const token = this.CreateAuthIDs({
            userId: data._id,
            email: data.email,
            expires,
          });

          if (!token.success) {
            return {
              success: false,
              data: { finalData: { token: null, user: null } },
              error: token.error,
            };
          }

          return {
            success: true,
            data: { finalData: { token: token.data, user: data } },
            error: null,
          };
        } else {
          // Passwords do not match
          return { success: false, data: null, error: "Invalid password" };
        }
      } else {
        // User does not exist, create a new account
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await this.UserRepo.createAccount({
          email,
          password: hashedPassword,
        });
        console.log(createUser, "2");
        if (createUser.success && createUser.data) {
          const token = this.CreateAuthIDs({
            userId: createUser.data._id,
            email: createUser.data.email,
            expires,
          });

          if (!token.success) {
            return {
              success: false,
              data: { finalData: { token: null, user: null } },
              error: token.error,
            };
          }

          return {
            success: true,
            data: { finalData: { token: token.data, user: createUser.data } },
            error: null,
          };
        } else {
          // Error creating user
          return {
            success: false,
            data: null,
            error: "Error creating user",
          };
        }
      }
    } catch (error) {
      console.error("Error in userLogin service:", error);
      return { success: false, data: null, error: "Internal Server Error" };
    }
  }

  public async checkEmail({ email }: { email: string }) {
    try {
      const userExists = await this.UserRepo.checkEmail({ email });
      return { success: true, data: userExists.data, error: null };
    } catch (error) {
      console.log("Error in checkEmail service:", error);
      return { success: false, data: null, error };
    }
  }

  public async createAccount({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      // return { success: true, data: createUser.data, error: null };
    } catch (error) {
      console.log("Error in createAccount service:", error);
      return { success: false, data: null, error };
    }
  }
}
export { UserService };
