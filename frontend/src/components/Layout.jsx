import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
