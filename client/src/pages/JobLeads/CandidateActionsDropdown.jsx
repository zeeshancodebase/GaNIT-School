import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaListAlt,
  FaSyncAlt,
  FaExchangeAlt,
  // FaTrash,
  FaHistory,
} from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";

const CandidateActionsDropdown = ({
  candidate,
  openUpdateOutreachModal,
  fetchLogsHandler,
  openTransferModal,
  openEditCandidateModal,
  handleDeleteCandidate,
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
  const canEdit = true; // Update to check for actual userRole
  // const canDelete = true; // Update to check for actual userRole
  const canTransfer = candidate.outreachDetails?.assignedTo?._id
    ? candidate.outreachDetails.assignedTo._id === user?._id
    : true; // If no assigned user, allow anyone to transfer

  const canUpdateStatus =
    candidate.outreachDetails?.assignedTo?._id === user?._id;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="dropdown-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Actions for ${candidate.name || "candidate"}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onKeyDownToggle}
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <ul className="dropdown-menu" role="menu">
          {/* Update Status */}
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canUpdateStatus ? 0 : -1}
            onClick={() => {
              if (canUpdateStatus) {
                openUpdateOutreachModal(candidate);
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
                  openUpdateOutreachModal(candidate);
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
            Update Status
          </li>

          {/* View Activity Logs */}
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={0}
            onClick={() => {
              fetchLogsHandler(candidate._id);
              setOpen(false);
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => fetchLogsHandler(candidate._id))
            }
          >
            <FaHistory className="dropdown-icon" />
            View Logs
          </li>

          {/* Transfer */}
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canTransfer ? 0 : -1}
            onClick={() => {
              if (canTransfer) {
                openTransferModal(candidate);
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
                  openTransferModal(candidate);
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
              onViewDetails(candidate);
              setOpen(false);
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => {
                onViewDetails(candidate);
                setOpen(false);
              })
            }
          >
            <FaListAlt className="dropdown-icon" />
            View Details
          </li>

          {/* Edit Candidate */}
          <li
            className="dropdown-item"
            role="menuitem"
            tabIndex={canEdit ? 0 : -1}
            onClick={() => {
              if (canEdit) {
                openEditCandidateModal(candidate);
                setOpen(false);
              }
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(e, () => openEditCandidateModal(candidate))
            }
            style={{
              cursor: canEdit ? "pointer" : "not-allowed",
              opacity: canEdit ? 1 : 0.5,
            }}
            aria-disabled={!canEdit}
          >
            <FaEdit className="dropdown-icon" />
            Edit Candidate Details
          </li>

          {/* Delete Candidate 
          <li
            className="dropdown-item delete-item"
            role="menuitem"
            tabIndex={canDelete ? 0 : -1}
            onClick={() => {
              if (canDelete) {
                handleDeleteCandidate(candidate._id);
                setOpen(false);
              }
            }}
            onKeyDown={(e) =>
              onKeyDownMenuItem(
                e,
                () => handleDeleteCandidate(candidate._id),
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
            Delete Candidate
          </li>*/}
        </ul>
      )}
    </div>
  );
};

export default CandidateActionsDropdown;
