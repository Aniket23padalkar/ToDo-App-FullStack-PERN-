import type { EditTodoProps } from "../types/props.types";
import type {
  TodoResponse,
  GetTodosResponse,
  TodosData,
} from "../types/todo.types";

const API = "http://localhost:3000/api/todos";

export const createTodo = async (title: string): Promise<TodoResponse> => {
  try {
    const res = await fetch(`${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      credentials: "include",
    });

    const result: TodoResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (err) {
    throw err;
  }
};

export const getTodos = async (): Promise<GetTodosResponse> => {
  try {
    const res = await fetch(`${API}`, {
      method: "GET",
      credentials: "include",
    });

    const result: GetTodosResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export const updateCheck = async (todo: TodosData): Promise<TodoResponse> => {
  try {
    const res = await fetch(`${API}/${todo.todo_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        is_completed: !todo.is_completed,
      }),
      credentials: "include",
    });

    const result: TodoResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export const editTodo = async ({
  todo,
  editText,
}: EditTodoProps): Promise<TodoResponse> => {
  try {
    const res = await fetch(`${API}/${todo.todo_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editText,
        is_completed: todo.is_completed,
      }),
      credentials: "include",
    });

    const result: TodoResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (todo_id: number): Promise<TodoResponse> => {
  try {
    const res = await fetch(`${API}/${todo_id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result: TodoResponse = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};
