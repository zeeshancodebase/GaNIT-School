import React, { useState, useRef, useEffect } from "react";

import "./header.css";
import { Link } from "react-router-dom";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDeviceSize } from "../../../context/DeviceSizeContext";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isMobile } = useDeviceSize();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleTitleClick = () => {
    if (user?.isOwner) {
      navigate("/Admin/Dashboard");
    } else if (user?.role === "manager" || user?.role === "salesman") {
      navigate("/Staff/Dashboard");
    } else {
      toast.error("You are not an authorized person");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <header className="header">
        {/* <h1>Textile Merchant Admin Panel</h1> */}
        <div className="header-wrapper">
          {isMobile && (
            <>
              <IoMenu
                size={24}
                color="white"
                onClick={() => setShowSidebar(true)}
                style={{ cursor: "pointer" }}
              />
            </>
          )}

          <h1 className="header-title" onClick={handleTitleClick}>
            Rehmat Textile
          </h1>

          <div style={{ position: "relative" }} ref={dropdownRef}>
            <div className="header-avatar-wrapper" onClick={toggleDropdown}>
              <div className="header-avatar">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
              {/* {user?.role === "admin" && (
                  <div className="admin-icon-overlay">
                    <FaUserShield size={14} color="#4a90e2" />
                  </div>
                )} */}
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
        </div>
      </header>
      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
};

export default Header;
