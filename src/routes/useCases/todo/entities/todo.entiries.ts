export class Todo {
  name: string;
  description?: string;
  date: string;
  date_conclusion?: string;
  status: "AWAITING" | "FINISHED";
  user_id: string;
}
