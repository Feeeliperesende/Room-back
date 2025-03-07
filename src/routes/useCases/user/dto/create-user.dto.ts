import { IsEmail, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail({}, { message: "Digite um email" })
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
