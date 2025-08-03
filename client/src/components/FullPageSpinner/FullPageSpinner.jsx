import React from "react";
import "./FullPageSpinner.css";

const FullPageSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <img
          src="/assets/images/logo10.png"
          alt="Loading..."
          className="spinner-logo"
        />
        <div className="spinner-ring" />
      </div>
    </div>
  );
};

export default FullPageSpinner;
