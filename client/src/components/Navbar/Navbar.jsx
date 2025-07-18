import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css"; 
import { Link, NavLink } from "react-router-dom";

const Logo = () => (
  // <span className="logo">
  //   <FaGraduationCap /> GaNIT<span className="highlight">School</span>
  // </span>
  <div className="logo">
  {/* <FaGraduationCap className="logo-icon" /> */}
  <img src="/assets/images/logo9.png" alt="Logo" className="logo-image" />
  <div className="logo-text">
    <span className="logo-ganit">GaNIT</span>
    <span className="logo-school">School</span>
  </div>
</div>

);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
          <a href="/about" className="btn primary">
            Join Now / Login
          </a>
        </div>
      </header></>
  );
};

export default Navbar;
