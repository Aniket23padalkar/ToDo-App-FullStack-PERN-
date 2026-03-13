import { useContext, useState } from "react";
import { FaPlus, FaPowerOff } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import Todos from "../components/Todos";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setSuccess(data.message);
      setTodos((prev) => [data, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const pendingCount = todos.filter((t) => t.is_completed === false).length;
  const completedCount = todos.filter((t) => t.is_completed === true).length;

  return (
    <main className="flex flex-col bg-white p-4 rounded h-110 w-120 shadow">
      <header className="flex justify-between items-center pb-4">
        <h1 className="font-medium text-xl capitalize">
          <span className="text-green-600">Hi, </span>
          {user.username}!
        </h1>
        <button
          onClick={logout}
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
            onClick={(e) => setFilter(e.target.value)}
            value="All"
            className={`filter-btn ${filter === "All" ? "bg-teal-800 text-white border-transparent" : "text-teal-700"}`}
          >
            ALL
          </button>
          <button
            onClick={(e) => setFilter(e.target.value)}
            value="Completed"
            className={`filter-btn ${filter === "Completed" ? "bg-teal-800 text-white border-transparent" : "text-teal-700"}`}
          >
            Completed
          </button>
          <button
            onClick={(e) => setFilter(e.target.value)}
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
