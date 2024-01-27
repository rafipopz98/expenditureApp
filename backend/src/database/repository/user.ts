import User from "../model/user";

class UserRepository {
  public async checkEmail({ email }: { email: string }) {
    try {
      const userExists = await User.findOne({ email });
      return { success: true, data: userExists, error: null };
    } catch (error) {
      console.log("Error in checkEmail repository:", error);
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
      const createUser = await User.create({ email, password });
      return { success: true, data: createUser, error: null };
    } catch (error) {
      console.log("Error in createAccount repository:", error);
      return { success: false, data: null, error };
    }
  }

  public async loginEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const loginUser = await User.findOne({ email, password });
      return { success: true, data: loginUser, error: null };
    } catch (error) {
      console.log("Error in loginEmail repository:", error);
      return { success: false, data: null, error };
    }
  }
}
export { UserRepository };
