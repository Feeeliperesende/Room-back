import { ApiError } from "@helpers/error";
import { prisma } from "../../../config";
import { CreateUserDto } from "./dto/create-user.dto";
import Encryptor from "@helpers/encryptor";
import { UpdateUserDto } from "./dto/update-user.dto";

const Hash = new Encryptor();

export default class UserRepository {
  async create(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const find = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (find) {
      throw new ApiError("Email already exists", 400);
    }

    const hashedPass = await Hash.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        ...userDto,
        password: hashedPass,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
        hash: true,
        token: true,
      },
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  async update(id, data: UpdateUserDto) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return await prisma.user.update({
      where: {
        id,
      },
      data,
      omit: {
        password: true,
      },
    });
  }

  async remove(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const userDeleted = await prisma.user.delete({
      where: {
        id,
      },
    });

    const data = {
      has_removed: true,
    };

    if (userDeleted) {
      return data;
    }
  }
}
