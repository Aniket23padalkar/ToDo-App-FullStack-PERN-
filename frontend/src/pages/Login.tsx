import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import bgImg from "../assets/login-bg.jpg";
import { loginUser } from "../api/authApi";
import type { LoginData } from "../types/auth.types.ts";
import useAuth from "../hooks/useAuth.js";

export default function Login() {
  const { loading, setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [login, setLogin] = useState<LoginData>({
    email_id: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await loginUser(login);

      console.log(result);

      setUser(result.user);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err.message);
      }
    }
  }

  return (
    <main
      className="flex h-full w-full justify-center items-center bg-no-repeat bg-cover "
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <section className="h-90 w-100 p-4 rounded-lg shadow bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center h-full w-full"
        >
          <h1 className="text-center text-2xl mb-4 font-bold">
            Wel<span className="text-green-600">come!</span>
          </h1>
          {error && <p className="text-xs text-center text-red-500">{error}</p>}
          <input
            value={login.email_id}
            onChange={handleChange}
            name="email_id"
            className="input"
            type="Email"
            placeholder="Email Id"
          />
          <input
            value={login.password}
            onChange={handleChange}
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
          <button className="flex items-center justify-center w-30 bg-green-700 text-white font-medium p-2 rounded-lg mt-6 hover:bg-green-600 cursor-pointer">
            {loading ? <HashLoader size={25} /> : <p>Login</p>}
          </button>
          <Link to="/register">
            <p className="text-xs text-right mt-6 underline text-blue-600">
              Register here!
            </p>
          </Link>
        </form>
      </section>
    </main>
  );
}
