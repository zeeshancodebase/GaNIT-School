import React, { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Avatar from "../Avatar/Avatar";

const Logo = () => (
  // <span className="logo">
  //   <FaGraduationCap /> GaNIT<span className="highlight">School</span>
  // </span>
  <div className="logo">
    {/* <FaGraduationCap className="logo-icon" /> */}
    <img src="/assets/images/logo10.png" alt="Logo" className="logo-image" />
    <div className="logo-text">
      <span className="logo-ganit">GANIT</span>
      <span className="logo-school">School</span>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handlePanelNavigate = () => {
    switch (user?.role) {
      case "admin":
        navigate("/super-admin");
        break;
      case "hr":
        navigate("/hr/home");
        break;
      default:
        navigate("/job-board");
        break;
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              {/* <FaGraduationCap size={35} /> */}
              <Logo />
            </Link>
          </div>
          <nav className={`nav-links ${isOpen ? "show" : ""}`}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/career-tracks">Career Tracks</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/live">Live Classes</NavLink>
            <NavLink to="/job-board">Job Board</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact-us">Contact</NavLink>
          </nav>
          <button className="menu-btn" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>

          {isLoggedIn ? (
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <div onClick={toggleDropdown} style={{cursor:"pointer"}}>
                <Avatar src={user?.photo} alt={user?.fullName} />
              </div>
              {showDropdown && (
                <div className="avatar-dropdown-menu">
                  <button onClick={handlePanelNavigate}>
                    <MdDashboard size={20} /> HR Panel
                  </button>
                  <button onClick={() => navigate(`/profile/${user._id}`)}>
                    <FaUserShield size={20} /> Profile
                  </button>
                  <button onClick={() => navigate("/resetPassword")}>
                    <RiLockPasswordLine size={20} /> Change
                  </button>
                  <button
                    aria-label="Logout"
                    onClick={() => navigate("/logout")}
                    className="logout-button"
                  >
                    <FaSignOutAlt size={20} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn primary">
              Join Now / Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
