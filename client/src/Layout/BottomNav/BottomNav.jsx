import React, { useState } from "react";
import "./BottomNav.css";
import {
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaChartBar,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const BottomNav = () => {
  const { user } = useAuth();

  const [active, setActive] = useState("dashboard");

  const getDashboardPath = () => {
    if (user?.isOwner) return "/Admin/Dashboard";
    if (user?.role === "manager" || user?.role === "salesman") return "/Staff/Dashboard";
    return "/"; // fallback
  };

  return (
    <nav className="bottom-nav">
      <NavLink
        to={getDashboardPath()}
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <MdDashboard />
        <span className="nav-label">Dashboard</span>
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FaSearch />
        <span className="nav-label">Products</span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FaFileInvoiceDollar />
        <span className="nav-label">Billing</span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FaChartBar />
        <span className="nav-label">Reports</span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <FaUser />
        <span className="nav-label">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
