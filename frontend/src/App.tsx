import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import logo from "./assets/logo.png";
import useAuth from "./hooks/useAuth.js";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <img
        src={logo}
        className="absolute top-0 left-0 h-35 w-55 object-cover drop-shadow-lg drop-shadow-gray-600"
      />

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}
