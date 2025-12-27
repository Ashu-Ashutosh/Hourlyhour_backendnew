import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar with fixed width */}
      <div className="w-64">
        {" "}
        {/* Or whatever width you need */}
        <Sidebar />
      </div>

      {/* Main Content with remaining width */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
