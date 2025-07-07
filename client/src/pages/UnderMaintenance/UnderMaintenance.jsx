import React from "react";
import './UnderMaintenance.css';

const underMaintenance = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">We're Coming Soon!</h1>
        <p className="message">
          Our website is currently under maintenance. We'll be back shortly.
        </p>
        <div className="image-container">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="maintenance-image"
          />
        </div>
        <div className="countdown">
          <p className="countdown-text">Estimated time: 7 Days</p>
        </div>
        <footer>
          <p>© 2025 GaNIT School. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default underMaintenance;
