import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";

const RootLayout = () => {
  return (
    <div>
      <AdminNavBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
