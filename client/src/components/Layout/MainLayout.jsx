import React from "react";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page-container">{children}</div>
    </>
  );
}
