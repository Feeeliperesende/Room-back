import { ApiError } from "@helpers/error";
import Encryptor from "@helpers/encryptor";
import { LoginRequest } from "routes/useCases/auth/type/login";
import { sign } from "jsonwebtoken";
import { UserSign } from "./type/user-sign";
import { UserService } from "../user";

const Hash = new Encryptor();
const User = new UserService();
export default class AuthRepository {
  async login(user: LoginRequest) {
    const { email, password } = user;
    const userFound = await User.findByEmail(email);

    if (!userFound) {
      throw new ApiError("Email ou Senha incorretas", 401);
    }

    const pass = await Hash.comparePassword(password, userFound.password);

    if (!pass) {
      throw new ApiError("Email ou Senha incorretas", 401);
    }
    const token = await this.generateToken({
      email: userFound.email,
      name: userFound.first_name,
      id: userFound.id,
    });

    const data = {
      id: userFound.id,
      first_name: userFound.first_name,
      last_name: userFound.last_name,
      phone: userFound.phone,
      email: userFound.email,
      token: token,
    };

    return data;
  }

  async generateToken(user: UserSign) {
    const token = sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }
}
