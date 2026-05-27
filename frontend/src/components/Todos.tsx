import { useEffect } from "react";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import type { TodosComponentProps } from "../types/props.types";
import { deleteTodo, editTodo, getTodos, updateCheck } from "../api/todoApi";
import type { TodosData } from "../types/todo.types";

export default function Todos({
  todos,
  setTodos,
  filter,
}: TodosComponentProps) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  async function fetchTodos(): Promise<void> {
    setError("");
    setLoading(true);

    try {
      const result = await getTodos();

      console.log(result.todos);

      setTodos(result.todos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function handleToggle(id: number) {
    setActiveMenu((prev) => (prev === id ? null : id));
    setEditId(null);
  }

  async function handleCheck(todo: TodosData): Promise<void> {
    try {
      const result = await updateCheck(todo);

      console.log(result);

      setTodos((prev) =>
        prev.map((t) => (t.todo_id === todo.todo_id ? result.todo : t)),
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  const filtered = todos.filter((t) => {
    if (filter === "Completed") {
      return t.is_completed === true;
    } else if (filter === "Pending") {
      return t.is_completed === false;
    } else {
      return t;
    }
  });
  console.log(filtered);

  async function handleEdit(todo: TodosData): Promise<void> {
    try {
      const result = await editTodo({ todo, editText });

      setTodos((prev) =>
        prev.map((t) => (t.todo_id === todo.todo_id ? result.todo : t)),
      );

      setEditId(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  async function handleDelete(todo_id: number): Promise<void> {
    try {
      await deleteTodo(todo_id);

      setTodos((prev) => prev.filter((t) => t.todo_id !== todo_id));
      setActiveMenu(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  return (
    <section className="flex flex-col h-full mt-2 gap-1 overflow-y-auto">
      {filtered.map((todo) => {
        return (
          <div
            className="flex items-center h-10 p-2 rounded relative"
            key={todo.todo_id}
          >
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => handleCheck(todo)}
              className="accent-green-500 h-5 w-5"
            />
            {editId === todo.todo_id ? (
              <input
                className="border border-blue-400 ml-2 rounded w-10/12 capitalize"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEdit(todo);
                    setActiveMenu(null);
                  }
                }}
              />
            ) : (
              <h1
                className={`pl-2 capitalize font- ${todo.is_completed ? "line-through text-gray-400" : ""}`}
              >
                {todo.title}
              </h1>
            )}
            <button
              onClick={() => handleToggle(todo.todo_id)}
              className="ml-auto font-bold py-0.5 text-xl cursor-pointer hover:bg-gray-200 rounded"
            >
              <FaEllipsisVertical />
            </button>
            {activeMenu === todo.todo_id && (
              <div className="flex flex-col text-white p-1 rounded bg-white gap-1 absolute shadow shadow-gray-500 z-10 top-10 right-0">
                <button
                  disabled={todo.is_completed === true}
                  onClick={() => {
                    setEditId(todo.todo_id);
                    setEditText(todo.title);
                  }}
                  className="px-1 text-xs bg-blue-500 rounded disabled:bg-gray-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.todo_id)}
                  className="px-1 text-xs bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
