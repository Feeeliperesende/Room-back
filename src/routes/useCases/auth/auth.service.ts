import AuthRepository from "./auth.repository";
import { LoginRequest } from "./type/login";

const repository = new AuthRepository();
export default class AuthService {
  async login(user: LoginRequest) {
    return await repository.login(user);
  }
}
