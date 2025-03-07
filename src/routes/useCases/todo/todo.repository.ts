import { ApiError } from "@helpers/error";
import { prisma } from "../../../config";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
export default class TodoRepository {
  async create(CreateTodoDto: CreateTodoDto) {
    const todo = await prisma.todo.create({
      data: {
        ...CreateTodoDto,
      },
    });

    return todo;
  }

  async findById(id: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new ApiError("Todo not found", 404);
    }

    return todo;
  }

  async findByUserId(user_id: string) {
    const todo = await prisma.todo.findMany({
      where: {
        user_id,
      },
    });
    if (todo.length == 0) {
      return [];
    }

    return todo;
  }

  async update(id: string, UpdateTodoDto: UpdateTodoDto) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new ApiError("Todo not found", 404);
    }
    const update = await prisma.todo.update({
      where: {
        id,
      },
      data: UpdateTodoDto,
    });
    return update;
  }
  async remove(id: string) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new ApiError("Todo not found", 404);
    }

    const todoDeleted = await prisma.todo.delete({
      where: {
        id,
      },
    });
    const data = {
      has_removed: true,
    };

    if (todoDeleted) {
      return data;
    }
  }
}
