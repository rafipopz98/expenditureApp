import { UserService } from "../../service/user";
import { Request, Response } from "express";
class UserController {
  userService: UserService;
  constructor(US: UserService) {
    this.userService = US;
    this.userLogin = this.userLogin.bind(this);
  }
  public async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginResult = await this.userService.userLogin({
        email,
        password,
      });
      const statusCode = loginResult?.success
        ? loginResult.error === null
          ? 200
          : 401
        : 500;
      res.cookie("accessUserToken", loginResult?.data?.finalData.token, {
        httpOnly: true,
      });
      return res.status(statusCode).json(loginResult?.data);
    } catch (error) {
      console.error("Error in userLogin controller:", error);
      return res
        .status(500)
        .json({ success: false, data: null, error: "Internal Server Error" });
    }
  }
}
export { UserController };
