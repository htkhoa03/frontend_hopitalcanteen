import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ["/"];
  return (
    <div>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
