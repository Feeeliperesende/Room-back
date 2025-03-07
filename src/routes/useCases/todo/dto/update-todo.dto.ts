import { IsIn, IsOptional, IsString } from "class-validator";
import { Todo } from "../entities/todo.entiries";

export class UpdateTodoDto extends Todo {
  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsString()
  date: string;

  @IsOptional()
  date_conclusion?: string;

  @IsString()
  @IsIn(["AWAITING", "FINISHED"])
  status: "AWAITING" | "FINISHED";
}
