import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import TodoRepository from "./todo.repository";

const repository = new TodoRepository();

export default class TodoService {
  async create(data: CreateTodoDto) {
    return await repository.create(data);
  }
  async findByUserId(email: string) {
    return await repository.findByUserId(email);
  }
  async findById(id: string) {
    return await repository.findById(id);
  }
  async update(id: string, data: UpdateTodoDto) {
    return await repository.update(id, data);
  }
  async remove(id: string) {
    return await repository.remove(id);
  }
}
