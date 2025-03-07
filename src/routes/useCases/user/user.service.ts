import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import UserRepository from "./user.repository";

const repository = new UserRepository();
export default class UserService {
  async create(data: CreateUserDto) {
    return await repository.create(data);
  }
  async findByEmail(email: string) {
    return await repository.findByEmail(email);
  }
  async findById(id: string) {
    return await repository.findById(id);
  }
  async update(id: string, data: UpdateUserDto) {
    return await repository.update(id, data);
  }
  async remove(id: string) {
    return await repository.remove(id);
  }
}
