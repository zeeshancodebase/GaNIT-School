// ActiveFiltersRow.jsx
import React from "react";
import { FaEraser, FaTimes } from "react-icons/fa";
import "./ActiveFiltersRow.css";

const ActiveFiltersRow = ({
  filters,
  dispatch,
  setFilters,
  users,
  showAssignedFilter,
  setShowAssignedFilter,
  setShowDateFilter,
}) => {
  const clearFilter = (key) => {
    const newFilters = { ...filters, [key]: "" };

    // Special handling
    if (key === "followUpStartDate" || key === "followUpEndDate") {
      newFilters.followUpStartDate = "";
      newFilters.followUpEndDate = "";
      setShowDateFilter(true);
    }

    if (key === "assignedTo") {
      setShowAssignedFilter(false);
    }

    dispatch(setFilters(newFilters));
  };

  const clearAllFilters = () => {
    dispatch(
      setFilters({
        search: "",
        status: "",
        assignedTo: "",
        location: "",
        createdBy: "",
        followUpStartDate: "",
        followUpEndDate: "",
      })
    );
    setShowAssignedFilter(false);
    setShowDateFilter(true);
  };

  const getUserName = (id) => {
    const user = users.find((u) => u._id === id);
    return user?.name || "Unknown";
  };

  const activeTags = [];

  if (filters.assignedTo && showAssignedFilter) {
    activeTags.push({
      label:
        filters.assignedTo === "me"
          ? "Assigned to: Me"
          : `Assigned to: ${getUserName(filters.assignedTo)}`,
      key: "assignedTo",
    });
  }

  if (filters.followUpStartDate && filters.followUpEndDate) {
    activeTags.push({
      label: `Follow-Up: ${filters.followUpStartDate} to ${filters.followUpEndDate}`,
      key: "followUpDate", // we'll treat both as one
    });
  }

  if (filters.status) {
    activeTags.push({ label: `Status: ${filters.status}`, key: "status" });
  }

  if (filters.location) {
    activeTags.push({
      label: `Location: ${filters.location}`,
      key: "location",
    });
  }

  if (filters.createdBy) {
    activeTags.push({
      label: `Created By: ${getUserName(filters.createdBy)}`,
      key: "createdBy",
    });
  }

  if (filters.search) {
    activeTags.push({ label: `Search: "${filters.search}"`, key: "search" });
  }

  if (activeTags.length === 0) return null;

  return (
    <div className="active-filters-row">
      {activeTags.map((tag, index) => (
        <div className="enabled-filter-wrapper">
          <span key={index} className="followup-highlight">
            {tag.label}
            <button
              onClick={() => clearFilter(tag.key)}
              className="btn-clear-x btn-with-icon"
              aria-label="Clear follow-up filter"
            >
              <FaTimes />
            </button>
          </span>{" "}
        </div>
      ))}

      <div>
        <button
          className="btn-secondary btn-clear-filters btn-with-icon"
          onClick={clearAllFilters}
        >
          <FaEraser /> Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ActiveFiltersRow;
