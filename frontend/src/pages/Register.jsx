import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import bgImg from "../assets/login-bg.jpg";

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [register, setRegister] = useState({
    username: "",
    email_id: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setSuccess(data.message);
      resetForm();
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setRegister({
      username: "",
      email_id: "",
      password: "",
    });
  }

  return (
    <main
      className="flex justify-center items-center h-full w-full bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <section className="w-100 h-90 p-4 rounded-lg shadow bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center h-full w-full"
        >
          <h1 className="text-center font-bold text-2xl mb-4">
            Regi<span className="text-green-600">ster</span>
          </h1>
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          {success && (
            <p className="text-center text-xs text-green-600">{success}</p>
          )}
          <input
            onChange={handleChange}
            value={register.username}
            name="username"
            className="input"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={handleChange}
            value={register.email_id}
            name="email_id"
            className="input"
            type="email"
            placeholder="Email Id"
          />
          <input
            onChange={handleChange}
            value={register.password}
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
          <button className="flex items-center justify-center w-30 mt-6 bg-green-700 rounded-lg text-white font-medium p-2 hover:bg-green-600 cursor-pointer">
            {loading ? <HashLoader size={25} /> : <p>Submit</p>}
          </button>
          <Link to="/login">
            <p className="text-xs text-blue-700 text-right mt-2 underline">
              Already user! Login here
            </p>
          </Link>
        </form>
      </section>
    </main>
  );
}
