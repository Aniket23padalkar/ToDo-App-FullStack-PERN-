import { useEffect } from "react";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function Todos({ todos, setTodos, filter }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  async function fetchTodos() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);

      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function handleToggle(id) {
    setActiveMenu((prev) => (prev === id ? null : id));
    setEditId(null);
  }

  async function handleCheck(todo) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/${todo.todo_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: todo.title,
            is_completed: !todo.is_completed,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setTodos((prev) =>
        prev.map((t) => (t.todo_id === todo.todo_id ? data : t)),
      );
    } catch (err) {
      console.log(err.message);
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

  async function handleEdit(todo) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/${todo.todo_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editText,
            is_completed: todo.is_completed,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setTodos((prev) =>
        prev.map((t) => (t.todo_id === todo.todo_id ? data : t)),
      );

      setEditId(null);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      setTodos((prev) => prev.filter((t) => t.todo_id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.log(err.message);
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
                  onClick={() => {
                    setEditId(todo.todo_id);
                    setEditText(todo.title);
                  }}
                  className="px-1 text-xs bg-blue-500 rounded"
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
