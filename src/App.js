import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import ManagementHome from "./Pages/ManagementHome";
import User from "./Pages/User";
import Home from "./Pages/Home";
import ProductManagement from "./components/componentManagement/ProductManagement";
import OrdersManagement from "./components/componentManagement/OrdersManagement";
import LayoutManagement from "./Pages/LayoutManagement";
import PatientManagement from "./components/componentManagement/PatientManagement";
import EmployeeManagement from "./components/componentManagement/EmployeesManagement";
import AccountingManagement from "./components/componentManagement/AccountingManagement";
import Patient from "./Pages/Patient";

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
              <Route path="/patient" element={<Patient />} />
              <Route path="/user" element={<User />} />

              {/* Management Routes */}
              <Route path="/management" element={<LayoutManagement />}>
                <Route path="management-home" element={<ManagementHome />} />
                <Route
                  path="employees-management"
                  element={<EmployeeManagement />}
                />
                <Route
                  path="product-management"
                  element={<ProductManagement />}
                />
                <Route
                  path="patient-management"
                  element={<PatientManagement />}
                />
                <Route
                  path="orders-management"
                  element={<OrdersManagement />}
                />
                <Route
                  path="accounting-management"
                  element={<AccountingManagement />}
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
