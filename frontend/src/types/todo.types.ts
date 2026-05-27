export interface TodosData {
  todo_id: number;
  title: string;
  is_completed: boolean;
  created_at: Date;
}

export interface TodoResponse {
  todo: TodosData;
  message: string;
}

export type FilterData = "All" | "Completed" | "Pending";

export interface GetTodosResponse extends TodosData {
  todos: TodosData[];
  message: string;
}
