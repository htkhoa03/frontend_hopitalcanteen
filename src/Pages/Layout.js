import React from "react";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <footer></footer>
    </>
  );
};

export default Layout;
