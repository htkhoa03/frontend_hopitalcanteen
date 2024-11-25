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
import StaffManagement from "./components/componentManagement/StaffManagement";
import ProductManagement from "./components/componentManagement/ProductManagement";
import AccountManagement from "./components/componentManagement/AccoutManagement";
import OrdersManagement from "./components/componentManagement/OrdersManagement";
import LayoutManagement from "./Pages/LayoutManagement";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/user" element={<User />} />

              {/* Management Routes */}
              <Route path="/management" element={<LayoutManagement />}>
                <Route path="management-home" element={<ManagementHome />} />
                <Route path="staff-management" element={<StaffManagement />} />
                <Route
                  path="product-management"
                  element={<ProductManagement />}
                />
                <Route
                  path="account-management"
                  element={<AccountManagement />}
                />
                <Route
                  path="orders-management"
                  element={<OrdersManagement />}
                />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
