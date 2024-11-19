import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ManagementHome from "./Pages/ManagementHome";
import User from "./Pages/User";
import Home from "./Pages/Home";
import "../src/App.css";
import StaffManagement from "./components/componentManagement/StaffManagement";
import ProductManagement from "./components/componentManagement/ProductManagement";
import AccoutManagement from "./components/componentManagement/AccoutManagement";
import Dashboard from "./components/componentManagement/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/management-home" element={<ManagementHome />} />
              <Route path="/staff-management" element={<StaffManagement />} />
              <Route
                path="/product-management"
                element={<ProductManagement />}
              />
              <Route
                path="/account-management"
                element={<AccoutManagement />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
