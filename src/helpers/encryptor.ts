import * as bcrypt from "bcryptjs";

export default class Encryptor {
  async hashPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  }

  async comparePassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}
