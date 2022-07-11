import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { NavigateToUsers } from "./components/NavigateToUsers";
import Links from "./pages/Links";
import Products from "./pages/products/Products";
import ProductForm from "./pages/products/ProductForm";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigateToUsers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id/links" element={<Links />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<ProductForm />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
