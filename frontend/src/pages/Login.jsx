import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import bgImg from "../assets/login-bg.jpg";

export default function Login() {
  const { UserLogin, loading } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState({
    email_id: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await UserLogin(login);
    } catch (err) {
      setError(err.message);
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
