import React from "react";

const StatusUpdateForm = ({
  candidate,
  newStatus,
  newNote,
  setNewStatus,
  setNewNote,
  handleStatusUpdate,
  resetForm,
}) => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <select
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
      style={{
        padding: "0.3rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    >
      <option value="">Select status</option>
      <option value="Contacted">Contacted</option>
      <option value="Interested">Interested</option>
       <option value="Enrolled">Enrolled</option>
      <option value="Not Interested">Not Interested</option>
      <option value="Rejected">We Rejected</option>
    </select>
    <textarea
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      rows={3}
      placeholder="Enter note..."
      style={{
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        resize: "vertical",
        marginRight: "0.5rem",
        width: "250px",
      }}
    />
    <button
      onClick={() => handleStatusUpdate(candidate._id)}
      className="lead-btn lead-btn-primary"
    >
      Update
    </button>
    <button onClick={resetForm} className="lead-btn lead-btn-secondary">
      Cancel
    </button>
  </div>
);

export default StatusUpdateForm;
