import type { FilterData, TodosData } from "./todo.types";

export interface TodosComponentProps {
  todos: TodosData[];
  setTodos: React.Dispatch<React.SetStateAction<TodosData[]>>;
  filter: FilterData;
}

export interface EditTodoProps {
  todo: TodosData;
  editText: string;
}
