import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

interface LayoutProps {
  children?: ReactNode; // Defines children as an optional ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children || <Outlet />}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
