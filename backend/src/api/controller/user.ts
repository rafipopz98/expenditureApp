import { UserService } from "../../service/user";
import { Request, Response } from "express";
class UserController {
  userService: UserService;
  constructor(US: UserService) {
    this.userService = US;
  }
  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.userService.userLogin({ email, password });
    const statusCode = data?.success ? (data.error === null ? 200 : 404) : 500;
    // res.cookie("accessUserToken", data.data?.token, {
    //   httpOnly: true,
    // });
    return res.status(statusCode).json(data);
  }
  public async userRegistration(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.userService.userLogin({ email, password });
    const statusCode = data?.success ? (data.error === null ? 200 : 404) : 500;
    // res.cookie("accessUserToken", data.data?.token, {
    //   httpOnly: true,
    // });
    return res.status(statusCode).json(data);
  }
}
export { UserController };
