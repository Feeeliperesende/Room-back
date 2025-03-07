import { IsEmail, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class UpdateUserDto extends User {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;
}
