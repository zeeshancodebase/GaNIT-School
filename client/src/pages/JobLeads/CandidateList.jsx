import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCandidates,
  updateCandidateStatus,
} from "../../app/slices/candidateSlice";
import "./CandidateList.css";
import Layout from "../../Layout/Layout";

const formatDate = (isoDate) => {
  if (!isoDate) return "—";
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const statuses = [
  "All",
  "New",
  "Contacted",
  "Interested",
  "Enrolled",
  "Not Interested",
  "Rejected",
];

const CandidateList = () => {
  const dispatch = useDispatch();
  const {
    list: candidates,
    isLoading,
    error,
  } = useSelector((state) => state.candidate);

  const [filterStatus, setFilterStatus] = useState("New");
  const [updatingCandidateId, setUpdatingCandidateId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAllCandidates());
  }, [dispatch]);

  const filteredCandidates =
    filterStatus === "All"
      ? candidates
      : candidates.filter((c) => (c.status || "New") === filterStatus);

  const handleStatusUpdate = async (candidateId) => {
    if (!newStatus) return alert("Select a status to update");
    try {
      await dispatch(
        updateCandidateStatus({ id: candidateId, status: newStatus })
      ).unwrap();
      setUpdatingCandidateId(null);
      setNewStatus("");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (isLoading) return <p>Loading candidates...</p>;
  if (error) return <p>Error fetching candidates: {error}</p>;
  if (!candidates.length) return <p>No candidates registered yet.</p>;

  return (
    <Layout>
      <div className="candidate-list-container">
        <h2>Registered Candidates</h2>
        <div
          className="list-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p>Total Candidates: {candidates.length}</p>

          <div className="filter-controls" style={{ marginBottom: "1rem" }}>
            <label htmlFor="statusFilter">Filter by Status: </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: "0.3rem", marginLeft: "0.5rem" }}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="candidate-table-container"
          style={{ overflowX: "auto" }}
        >
          <table className="candidate-table" style={{ minWidth: "1000px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Degree</th>
                <th>Branch</th>
                <th>College</th>
                <th>University</th>
                <th>YOP</th>
                <th>Skills</th>
                <th>Occupation</th>
                <th>Package (LPA)</th>
                <th>Preffered Course</th>
                <th>Applied For</th>
                <th>LinkedIn</th>
                <th>Status</th>
                <th>Source</th>
                <th>Referral Code</th>
                <th>Note</th>
                <th>Registered At</th>
                <th>Actions</th>
                {/* {filterStatus === "New" && <th>Actions</th>} */}
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length ? (
                filteredCandidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <td>{candidate.name || "—"}</td>
                    <td>{candidate.email || "—"}</td>
                    <td>{candidate.mobile || "—"}</td>
                    <td>{candidate.city || "—"}</td>
                    <td>{formatDate(candidate.dob)}</td>
                    <td>{candidate.gender || "—"}</td>
                    <td>{candidate.degree || "—"}</td>
                    <td>{candidate.branch || "—"}</td>
                    <td>{candidate.college || "—"}</td>
                    <td>{candidate.university || "—"}</td>
                    <td>{candidate.yearOfPassout || "—"}</td>
                    <td>
                      {candidate.skills?.length
                        ? candidate.skills.join(", ")
                        : "—"}
                    </td>
                    <td>{candidate.occupation || "—"}</td>
                    <td>{candidate.currentSalary || "—"}</td>
                    <td>{candidate.preferredCourse || "—"}</td>
                    <td>{candidate.appliedFor || "—"}</td>
                    <td>
                      {candidate.linkedIn ? (
                        <a
                          href={candidate.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--accent)",
                            textDecoration: "underline",
                          }}
                        >
                          Profile
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{candidate.status || "-"}</td>
                    <td>{candidate.source || "-"}</td>
                    <td>{candidate.referralCode || "-"}</td>
                    <td>{candidate.note || "-"}</td>
                    <td>
                      {candidate.createdAt
                        ? new Date(candidate.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    {filterStatus === "New" && (
                      <td>
                        {updatingCandidateId === candidate._id ? (
                          <>
                            <select
                              value={newStatus}
                              onChange={(e) => setNewStatus(e.target.value)}
                              style={{ marginRight: "0.5rem" }}
                            >
                              <option value="">Select status</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Interested">Interested</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(candidate._id)}
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setUpdatingCandidateId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              setUpdatingCandidateId(candidate._id)
                            }
                          >
                            Update Status
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={filterStatus === "New" ? 16 : 15}
                    style={{ textAlign: "center" }}
                  >
                    No candidates found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CandidateList;
