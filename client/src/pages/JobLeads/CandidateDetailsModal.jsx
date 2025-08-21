// CandidateDetailsModal.jsx
import React from "react";
import { formatDisplayDate } from "../../utils/dateUtils";

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

  return (
    <div className="candidate-details">
      <div className="candidate-section">
        <strong>Basic Info</strong>
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Mobile:</b> {mobile}
        </p>
        <p>
          <b>Email:</b> {email}
        </p>
        <p>
          <b>City:</b> {city || "N/A"}
        </p>
        <p>
          <b>DOB:</b> {dob ? formatDisplayDate(dob) : "N/A"}
        </p>
      </div>

      <div className="candidate-section">
        <strong>Education</strong>
        <p>
          <b>Degree:</b> {degree || "N/A"}
        </p>
        <p>
          <b>Branch:</b> {branch || "N/A"}
        </p>
        <p>
          <b>College:</b> {college || "N/A"}
        </p>
        <p>
          <b>University:</b> {university || "N/A"}
        </p>
        <p>
          <b>Year of Passout:</b> {yearOfPassout || "N/A"}
        </p>
      </div>

      <div className="candidate-section">
        <strong>Other Details</strong>
        <p>
          <b>Occupation:</b> {occupation || "N/A"}
        </p>
        <p>
          <b>Current Salary:</b> {currentSalary || "N/A"}
        </p>
        <p>
          <b>Preferred Course:</b> {preferredCourse || "N/A"}
        </p>
        <p>
          <b>Skills:</b>{" "}
          {skills && skills.length > 0 ? skills.join(", ") : "N/A"}
        </p>
        <p>
          <b>LinkedIn:</b> {linkedIn || "N/A"}
        </p>
        <p>
          <b>Source:</b> {source || "N/A"}
        </p>
        <p>
          <b>Referral Code:</b> {referralCode || "N/A"}
        </p>
        <p>
          <b>Applied For:</b> {appliedFor || "N/A"}
        </p>
      </div>

      <div className="candidate-section">
        <strong>Outreach Info</strong>
        <p>
          <b>Status:</b> {outreachDetails?.status || "N/A"}
        </p>
        <p>
          <b>Follow-Up Date:</b>{" "}
          {outreachDetails?.followUpDate
            ? formatDisplayDate(outreachDetails.followUpDate)
            : "N/A"}
        </p>
        <p>
          <b>Note:</b> {outreachDetails?.note || "N/A"}
        </p>
        <p>
          <b>Assigned To:</b> {outreachDetails?.assignedTo?.name || "N/A"}
        </p>
      </div>

      <div className="candidate-section">
        <strong>Timestamps</strong>
        <p>
          <b>Created At:</b> {formatDisplayDate(createdAt)}
        </p>
        <p>
          <b>Updated At:</b> {formatDisplayDate(updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
