import Login from "./Pages/Login";
import "../src/App.css";
import React from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import ProductManagement from "./Pages/ProductManagement";
import StaffManagement from "./Pages/StaffManagement";
import Account from "./Pages/Account";
import Report from "./Pages/Report";

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
        <Route path="/menu" element={<Menu></Menu>} />
        <Route
          path="/product-management"
          element={<ProductManagement></ProductManagement>}
        />
        <Route
          path="/staff-management"
          element={<StaffManagement></StaffManagement>}
        />
        <Route path="/report" element={<Report></Report>} />
        <Route path="/account" element={<Account></Account>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
