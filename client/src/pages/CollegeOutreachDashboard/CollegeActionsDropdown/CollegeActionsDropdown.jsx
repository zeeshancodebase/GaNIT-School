// CollegeActionsDropdown.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaListAlt,
  FaSyncAlt,
  FaExchangeAlt,
  FaTrash,
  FaHistory,
} from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import "./CollegeActionsDropdown.css";
import { toast } from "react-toastify";

const CollegeActionsDropdown = ({
  college,
  openEditOutreachModal,
  fetchLogsHandler,
  openTransferModal,
  openEditCollegeModal,
  handleDeleteCollege,
  userRole,
  user,
  onViewDetails,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard open/close
  const onKeyDownToggle = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onKeyDownMenuItem = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
      setOpen(false);
    }
  };

  // Role-based access
  // const canEdit = userRole === "admin";
  const canEdit = true;
  const canDelete = false; // Or: userRole === "superadmin";

  // ✅ Only allow transfer if the logged-in user is the one assigned to the college
  const canTransfer = college.outreachDetails?.assignedTo?._id === user?._id;

  // ✅ Allow transfer if the user is either the one assigned OR has admin role
  // const canTransfer =
  //   college.outreachDetails?.assignedTo?._id === user?._id ||
  //   user?.role === "admin";

  const canUpdateStatus =
    college.outreachDetails?.assignedTo?._id === user?._id;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="dropdown-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Actions for ${college.name || "college"}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onKeyDownToggle}
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <ul className="dropdown-menu" role="menu">
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canUpdateStatus ? 0 : -1}
            onClick={() => {
              if (canUpdateStatus) {
                openEditOutreachModal(college);
              } else {
                toast.warn(
                  "You are not allowed to update status. This is not assigned to you."
                );
              }
              setOpen(false);
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => {
                if (canUpdateStatus) {
                  openEditOutreachModal(college);
                  setOpen(false);
                } else {
                  toast.warn(
                    "You are not allowed to update status. This is not assigned to you."
                  );
                }
                setOpen(false);
              })
            }
            style={{
              cursor: canUpdateStatus ? "pointer" : "not-allowed",
              opacity: canUpdateStatus ? 1 : 0.5,
            }}
            aria-disabled={!canUpdateStatus}
            title={
              !canUpdateStatus ? "Only the assigned user can update status" : ""
            }
          >
            <FaSyncAlt className="dropdown-icon" />
            {/* Update Outreach Details */}
            Update Status
          </li>

          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={0}
            onClick={() => {
              fetchLogsHandler(college._id);
              setOpen(false);
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => fetchLogsHandler(college._id))
            }
          >
            <FaHistory className="dropdown-icon" />
            View Logs
          </li>
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canTransfer ? 0 : -1}
            onClick={() => {
              if (canTransfer) {
                openTransferModal(college);
              } else {
                toast.warn(
                  "You are not allowed to transfer. This is not assigned to you."
                );

                setOpen(false);
              }
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => {
                if (canTransfer) {
                  openTransferModal(college);
                  setOpen(false);
                } else {
                  toast.warn(
                    "You are not allowed to transfer. This is not assigned to you."
                  );
                }
                setOpen(false);
              })
            }
            style={{
              cursor: canTransfer ? "pointer" : "not-allowed",
              opacity: canTransfer ? 1 : 0.5,
            }}
            aria-disabled={!canTransfer}
          >
            <FaExchangeAlt className="dropdown-icon" />
            Transfer To
          </li>

          {/* View Full Details */}
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={0}
            onClick={() => {
              onViewDetails(college);
              setOpen(false);
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => {
                onViewDetails(college);
                setOpen(false);
              })
            }
          >
            <FaListAlt className="dropdown-icon" />
            View Details
          </li>

          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canEdit ? 0 : -1}
            onClick={() => {
              if (canEdit) {
                openEditCollegeModal(college);
                setOpen(false);
              }
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(
                e,
                () => openEditCollegeModal(college),
                !canEdit
              )
            }
            style={{
              cursor: canEdit ? "pointer" : "not-allowed",
              opacity: canEdit ? 1 : 0.5,
            }}
            aria-disabled={!canEdit}
          >
            <FaEdit className="dropdown-icon" />
            Edit College Details
          </li>
          <li
            className="dropdown-item delete-item"
            role="menuitem"
            tabIndex={canDelete ? 0 : -1}
            onClick={() => {
              if (canDelete) {
                handleDeleteCollege(college._id);
                setOpen(false);
              }
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(
                e,
                () => handleDeleteCollege(college._id),
                !canDelete
              )
            }
            style={{
              cursor: canDelete ? "pointer" : "not-allowed",
              opacity: canDelete ? 1 : 0.5,
            }}
            aria-disabled={!canDelete}
          >
            <FaTrash className="dropdown-icon" style={{ color: "red" }} />
            Delete College
          </li>
        </ul>
      )}
    </div>
  );
};

export default CollegeActionsDropdown;
