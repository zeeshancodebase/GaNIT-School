import React from 'react';
import { formatDate } from '../../utils/utils';

const CandidateDetails = ({ candidate }) => (
  <div className="expanded-content">
    <p><strong>City:</strong> {candidate.city || "—"}</p>
    <p><strong>DOB:</strong> {formatDate(candidate.dob)}</p>
    <p><strong>Degree:</strong> {candidate.degree}</p>
    <p><strong>Branch:</strong> {candidate.branch}</p>
    <p><strong>College:</strong> {candidate.college}</p>
    <p><strong>University:</strong> {candidate.university}</p>
    <p><strong>Year of Passout:</strong> {candidate.yearOfPassout}</p>
    <p><strong>Skills:</strong> {candidate.skills?.join(", ")}</p>
    <p><strong>Occupation:</strong> {candidate.occupation}</p>
    <p><strong>Current Salary:</strong> {candidate.currentSalary}</p>
    <p><strong>Preferred Course:</strong> {candidate.preferredCourse}</p>
    <p><strong>Source:</strong> {candidate.source}</p>
    <p><strong>Referral Code:</strong> {candidate.referralCode}</p>
    <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer">Profile</a></p>
    <p><strong>Registered At:</strong> {formatDate(candidate.createdAt)}</p>
    {candidate.note && <p><strong>Last Comment:</strong> {candidate.note}</p>}
  </div>
);

export default CandidateDetails;
