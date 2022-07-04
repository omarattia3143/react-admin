import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { NavigateToUsers } from "./components/NavigateToUsers";
import Links from "./pages/Links";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigateToUsers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id/links" element={<Links />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
