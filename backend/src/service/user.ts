import { UserRepository } from "../database/repository/user";

class UserService {
  UserRepo: UserRepository;
  constructor(UR: UserRepository) {
    this.UserRepo = UR;
  }
  async userLogin({ email, password }: { email: string; password: string }) {
    try {
      const loginData=await this.UserRepo.userLogin({email,password})
      return { success: null, data: loginData, error: null };
    } catch (error) {
      console.log("Error while loggin in user in User Service Layer", error);
      return { success: false, data: null, error };
    }
  }
}
export { UserService };
