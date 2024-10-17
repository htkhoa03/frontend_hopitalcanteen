import Login from "./Pages/Login";
import "../src/App.css";
import React from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagementHome from "./Pages/ManagementHome";
import User from "./Pages/User";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route
          path="/management-home"
          element={<ManagementHome></ManagementHome>}
        />
        <Route path="/user" element={<User></User>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
