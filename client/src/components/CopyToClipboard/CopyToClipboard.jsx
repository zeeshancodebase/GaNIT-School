import React, { useState } from "react";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "./CopyToClipboard.css";

const CopyToClipboard = ({
  text = "",                   // Text to copy
  successMessage = "Copied!",  // Custom success toast message
  errorMessage = "Failed to copy",
  className = "",
  style = {},
  disabled = false,
  showToast = true,            // Enable/disable toast
  ariaLabel = "Copy to clipboard",
  size = 18,                   // Icon size
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text || disabled) return;

    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        if (showToast) toast.success(successMessage);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        if (showToast) toast.error(errorMessage);
      });
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      aria-label={ariaLabel}
      title={copied ? successMessage : ariaLabel}
      className={`copy-btn ${className}`}
      style={{
        background: "none",
        border: "none",
        cursor: (disabled || !text) ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: copied ? "green" : "inherit",
        padding: 4,
        ...style,
      }}
      type="button"
    >
      {copied ? <FaCheckCircle size={size} /> : <FaRegCopy size={size} />}
    </button>
  );
};

export default CopyToClipboard;
