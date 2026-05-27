import { useContext, useState, type ChangeEvent } from "react";
import { FaPlus, FaPowerOff } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import Todos from "../components/Todos";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../api/authApi";
import type { FilterData, TodosData } from "../types/todo.types";
import { createTodo } from "../api/todoApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, setUser } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [todos, setTodos] = useState<TodosData[]>([]);
  const [filter, setFilter] = useState<FilterData>("All");
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createTodo(title);

      setSuccess(result.message);
      setTodos((prev) => [result.todo, ...prev]);
      setTitle("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const result = await logoutUser();

      console.log(result.message);
      setUser(null);
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  }

  const pendingCount = todos.filter((t) => t.is_completed === false).length;
  const completedCount = todos.filter((t) => t.is_completed === true).length;

  return (
    <main className="flex flex-col bg-white p-4 rounded h-110 w-120 shadow">
      <header className="flex justify-between items-center pb-4">
        <h1 className="font-medium text-xl capitalize">
          <span className="text-green-600">Hi, </span>
          {user?.username}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 text-white rounded px-2 hover:bg-red-600 cursor-pointer"
        >
          <FaPowerOff />
        </button>
      </header>
      <article className="flex flex-col flex-1 overflow-y-auto relative">
        <form onSubmit={handleSubmit} className="flex items-center relative">
          <input
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 pl-4 rounded-3xl outline-none bg-gray-200 p-2 pr-22 text-sm"
            type="text"
            placeholder="Add Your Task..."
          />
          <button className="bg-green-600 h-full w-20 px-1 text-sm absolute right-0 font-medium text-white rounded-3xl hover:bg-green-700">
            ADD
          </button>
        </form>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setFilter(e.currentTarget.value as FilterData)
            }
            value="All"
            className={`filter-btn ${filter === "All" ? "bg-teal-800 text-white border-transparent" : "text-teal-700"}`}
          >
            ALL
          </button>
          <button
            onClick={(e) => setFilter(e.currentTarget.value as FilterData)}
            value="Completed"
            className={`filter-btn ${filter === "Completed" ? "bg-teal-800 text-white border-transparent" : "text-teal-700"}`}
          >
            Completed
          </button>
          <button
            onClick={(e) => setFilter(e.currentTarget.value as FilterData)}
            value="Pending"
            className={`filter-btn ${filter === "Pending" ? "bg-teal-800 text-white border-transparent" : "text-teal-700"}`}
          >
            Pending
          </button>
        </div>

        <Todos todos={todos} setTodos={setTodos} filter={filter} />
      </article>
      <div className="pt-2 text-sm">
        {filter === "All" && (
          <p className="text-blue-600">
            Total : {todos.length === 0 ? "0" : todos.length}
          </p>
        )}
        {filter === "Pending" && (
          <p className="text-orange-500">Pending : {pendingCount}</p>
        )}
        {filter === "Completed" && (
          <p className="text-green-700">Completed : {completedCount}</p>
        )}
      </div>
    </main>
  );
}
