// CollegeDetailsModal.jsx
import React from "react";
import { formatDisplayDate } from "../../utils/dateUtils";
import "../JobLeads/CandidateDetailsModal"; // Reusing styles

const CollegeDetailsModal = ({ college }) => {
  if (!college) return null;

  const {
    name,
    location,
    contactPerson,
    contactEmail,
    contactPhone,
    outreachDetails,
    createdBy,
    createdAt,
    updatedAt,
  } = college;

  const Row = ({ label, value }) => (
    <div className="candidate-row">
      <div className="candidate-label">{label}</div>
      <div className="candidate-value">{value || "N/A"}</div>
    </div>
  );

  return (
    <div className="candidate-details">
      <div className="candidate-section">
        <strong>Basic Info</strong>
        <Row label="Name:" value={name} />
        <Row label="Location:" value={location} />
        <Row label="Contact Person:" value={contactPerson} />
        <Row label="Contact Email:" value={contactEmail} />
        <Row label="Contact Phone:" value={contactPhone} />
      </div>

      <div className="candidate-section">
        <strong>Outreach Info</strong>
        <Row label="Status:" value={outreachDetails?.status} />
        <Row
          label="Follow-Up Date:"
          value={
            outreachDetails?.followUpDate
              ? formatDisplayDate(outreachDetails.followUpDate)
              : "N/A"
          }
        />
        <Row label="Note:" value={outreachDetails?.note} />
        <Row
          label="Assigned To:"
          value={outreachDetails?.assignedTo?.name || "Unassigned"}
        />
      </div>

      <div className="candidate-section">
        <strong>Metadata</strong>
        {createdBy && <Row label="Created By:" value={createdBy?.name || "Unknown"} />}
        <Row label="Created At:" value={formatDisplayDate(createdAt)} />
        <Row label="Updated At:" value={formatDisplayDate(updatedAt)} />
      </div>
    </div>
  );
};

export default CollegeDetailsModal;
