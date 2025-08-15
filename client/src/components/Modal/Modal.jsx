import React, { useEffect } from "react";
import "./Modal.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  onClose,
  title,
  children,
  show = true,
  width = "500px",
  closeButton = true,
}) => {
  useEffect(() => {
    if (!show) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal"
        role="document"
        style={{ width: "100%", maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="modal-title">{title}</h3>}

        {closeButton && (
          <div className="modal-close" onClick={onClose} aria-label="Close">
            <button className="modal-close-btn">
              <FaTimes size={18} />
            </button>
          </div>
        )}

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
