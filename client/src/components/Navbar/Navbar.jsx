import React, { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  FaBriefcase,
  FaSignOutAlt,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Avatar from "../Avatar/Avatar";
import useHomeNavigator from "../../hooks/useHomeNavigator";

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
  const getHomePath = useHomeNavigator();
  const homePath = getHomePath(user?.role);
  // const handlePanelNavigate = () => {
  //   switch (user?.role) {
  //     case "admin":
  //       navigate("/super-admin");
  //       break;
  //     case "hr":
  //       navigate("/hr/home");
  //       break;
  //     default:
  //       navigate("/job-board");
  //       break;
  //   }
  // };

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <button className="menu-btn" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              {/* <FaGraduationCap size={35} /> */}
              <Logo />
            </Link>
          </div>

          {isLoggedIn ? (
            <>
              <nav className={`nav-links ${isOpen ? "show" : ""}`}>
                <NavLink to={homePath}>
                  <MdDashboard /> Admin Panel
                </NavLink>
                <NavLink to="/super-admin/jobs">
                  <FaBriefcase /> Job Portal
                </NavLink>
                <NavLink to="/super-admin/HRManagement">
                  <FaUserTie size={20} style={{paddingRight:"5px"}} />
                  HRs
                </NavLink>
                <NavLink to="/super-admin/Leads">
                  <FaUsers size={20} style={{paddingRight:"5px"}} />
                  Leads
                </NavLink>
                {/* <NavLink to="/live">Live Classes</NavLink>
                <NavLink to="/job-board">Job Board</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact-us">Contact</NavLink> */}
              </nav>
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
                  <Avatar src={user?.photo} alt={user?.fullName} />
                </div>
                {showDropdown && (
                  <div className="avatar-dropdown-menu">
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
            </>
          ) : (
            <>
              {" "}
              <nav className={`nav-links ${isOpen ? "show" : ""}`}>
                <NavLink to={homePath}>Home</NavLink>
                <NavLink to="/career-tracks">Career Tracks</NavLink>
                <NavLink to="/courses">Courses</NavLink>
                <NavLink to="/live">Live Classes</NavLink>
                <NavLink to="/job-board">Job Board</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact-us">Contact</NavLink>
              </nav>
              {/* <div></div> */}
              <Link
                to="https://ganitschool.akamai.net.in/"
                className="btn primary"
              >
                Join Now / Login
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
