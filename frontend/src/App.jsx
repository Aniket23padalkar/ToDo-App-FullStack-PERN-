import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import logo from "./assets/logo.png";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <img
        src={logo}
        className="absolute top-0 left-0 h-35 w-55 object-cover drop-shadow-lg drop-shadow-gray-600"
      />

      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}
