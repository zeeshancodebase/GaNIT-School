import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css"; 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="container">
        <a href="#" className="logo">
          GaNIT <span className="highlight">School</span>
        </a>
        <nav className={`nav-links ${isOpen ? "show" : ""}`}>
          <a href="#">Home</a>
          <a href="#career-tracks">Career Tracks</a>
          <a href="#courses">Courses</a>
          <a href="#">Live Classes</a>
          <a href="#job-board">Job Board</a>
          <a href="#about">About</a>
          <a href="#">Contact</a>
        </nav>
        <button className="menu-btn" onClick={toggleMenu}>
          <FiMenu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
