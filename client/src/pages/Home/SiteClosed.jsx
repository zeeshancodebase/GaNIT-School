import React from "react";
import { Link } from "react-router-dom";
import "./SiteClosed.css";

import { FaTriangleExclamation, FaLock, FaCircleInfo } from "react-icons/fa6";
import { FaHome, FaEnvelope } from "react-icons/fa";

const Logo = () => (
  <div className="logo">
    {/* <img src="/assets/images/logo10.png" alt="Logo" className="logo-image" />
    <div className="logo-text">
      <span className="logo-ganit">GANIT</span>
      <span className="logo-school">School</span>
    </div> */}
  </div>
);

export default function SiteClosed() {
  return (
    <div className="closed-page">
      {/* Top bar (matches your navbar vibe) */}
      <header className="closed-navbar">
        <div className="closed-container">
          <Link to="/" className="logo-link">
            <Logo />
          </Link>

          <div className="closed-badge">
            <FaLock />
            <span>Site Closed</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="closed-main">
        <div className="closed-card">
          <div className="closed-icon-ring">
            <FaTriangleExclamation className="closed-main-icon" />
          </div>

          <h1>
            This website is <span className="highlight">closed</span>
          </h1>

          <p className="closed-subtitle">
            This site is currently unavailable. Thank you for visiting.
          </p>

          <div className="closed-info-grid">
            <div className="closed-info">
              <FaLock className="info-icon" />
              <div>
                <h3>Access Disabled</h3>
                <p>All pages and services of this site are unavailable.</p>
              </div>
            </div>

            <div className="closed-info">
              <FaCircleInfo className="info-icon" />
              <div>
                <h3>Need Help?</h3>
                <p>Contact us and we’ll respond as soon as possible.</p>
              </div>
            </div>
          </div>

          <div className="closed-actions">
            <a className="btn primary" href="mailto:xyz@gmail.com">
              <FaEnvelope style={{ marginRight: 8 }} />
              Email Support
            </a>

            <Link className="btn secondary" to="/">
              <FaHome style={{ marginRight: 8 }} />
              Go to Home
            </Link>
          </div>

          <div className="closed-footnote">
            <span className="dot" />
            {/* <span>© 2025 GaNIT School</span> */}
          </div>
        </div>
      </main>
    </div>
  );
}
