import React from "react";
import { formatDisplayDate } from "../../utils/dateUtils";
import "./CandidateDetailsModal.css"; // import your styles

const CandidateDetailsModal = ({ candidate }) => {
  if (!candidate) return null;

  const {
    name,
    mobile,
    email,
    city,
    dob,
    degree,
    branch,
    college,
    university,
    yearOfPassout,
    skills,
    occupation,
    currentSalary,
    preferredCourse,
    linkedIn,
    source,
    referralCode,
    appliedFor,
    outreachDetails,
    createdAt,
    updatedAt,
  } = candidate;

  // Helper to render a row
  const Row = ({ label, value }) => (
    <div className="candidate-row">
      <div className="candidate-label">{label}</div>
      <div className="candidate-value">{value || "N/A"}</div>
    </div>
  );

  const normalizeUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <div className="candidate-details">
      <div className="candidate-section">
        <strong>Basic Info</strong>
        <Row label="Name:" value={name} />
        <Row label="Mobile:" value={mobile} />
        <Row label="Email:" value={email} />
        <Row label="City:" value={city} />
        <Row label="DOB:" value={dob ? formatDisplayDate(dob) : "N/A"} />
      </div>

      <div className="candidate-section">
        <strong>Education</strong>
        <Row label="Degree:" value={degree} />
        <Row label="Branch:" value={branch} />
        <Row label="College:" value={college} />
        <Row label="University:" value={university} />
        <Row label="Year of Passout:" value={yearOfPassout} />
      </div>

      <div className="candidate-section">
        <strong>Other Details</strong>
        <Row label="Occupation:" value={occupation} />
        <Row label="Current Salary:" value={currentSalary} />
        <Row label="Preferred Course:" value={preferredCourse} />
        <Row
          label="Skills:"
          value={skills && skills.length > 0 ? skills.join(", ") : "N/A"}
        />
        <Row
          label="LinkedIn:"
          value={
            linkedIn ? (
              <a
                href={normalizeUrl(linkedIn)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                Visit Profile
              </a>
            ) : (
              "N/A"
            )
          }
        />

        <Row label="Source:" value={source} />
        <Row label="Referral Code:" value={referralCode} />
        <Row label="Applied For:" value={appliedFor} />
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
        <Row label="Assigned To:" value={outreachDetails?.assignedTo?.name} />
      </div>

      <div className="candidate-section">
        <strong>Timestamps</strong>
        <Row label="Created At:" value={formatDisplayDate(createdAt)} />
        <Row label="Updated At:" value={formatDisplayDate(updatedAt)} />
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
