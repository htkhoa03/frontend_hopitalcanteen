import Login from "./Pages/Login";
import "../src/App.css";
import React from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagementHome from "./Pages/ManagementHome";
import User from "./Pages/User";
import Home from "./Pages/Home";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Pages/Layout";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Layout> */}
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
        {/* </Layout> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
