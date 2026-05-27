export interface Todo {
  todo_id: number;
  title: string;
  is_completed: boolean;
  created_at: Date;
}

export interface InsertTodo {
  title: string;
  user_id: number;
}

export type EditTodoType = Omit<Todo, "created_at"> & { user_id: number };

export interface TodoExists {
  todo_id: number;
  user_id: number;
}
