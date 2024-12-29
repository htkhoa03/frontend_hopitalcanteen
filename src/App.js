import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import ManagementHome from "./Pages/ManagementHome";
import Home from "./Pages/Home";
import ProductManagement from "./components/componentManagement/ProductManagement";
import OrdersManagement from "./components/componentManagement/OrdersManagement";
import LayoutManagement from "./Pages/LayoutManagement";
import PatientManagement from "./components/componentManagement/PatientManagement";
import EmployeeManagement from "./components/componentManagement/EmployeesManagement";
import AccountingManagement from "./components/componentManagement/AccountingManagement";
import CategoryManagament from "./components/componentManagement/CategoryManagament";
import UserPage from "./Pages/User";
import PatientPage from "./Pages/Patient";

// Component Loading
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppWithNavigation /> {/* Đảm bảo AppWithNavigation nằm trong BrowserRouter */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

function AppWithNavigation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Đảm bảo useNavigate được gọi trong component con của BrowserRouter

  const handleNavigate = (path) => {
    setLoading(true); // Bật loading
    setTimeout(() => {
      navigate(path); // Điều hướng sau khi loading
      setLoading(false); // Tắt loading sau khi chuyển trang
    }, 1000); // Thời gian giả lập loading (1 giây)
  };

  return (
    <div>
      {loading && <Loading />}
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/user" element={<UserPage />} />

          {/* Management Routes */}
          <Route path="/management" element={<LayoutManagement />}>
            <Route path="management-home" element={<ManagementHome />} />
            <Route path="employees-management" element={<EmployeeManagement />} />
            <Route path="product-management" element={<ProductManagement />} />
            <Route path="patient-management" element={<PatientManagement />} />
            <Route path="orders-management" element={<OrdersManagement />} />
            <Route path="accounting-management" element={<AccountingManagement />} />
            <Route path="category-management" element={<CategoryManagament />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
