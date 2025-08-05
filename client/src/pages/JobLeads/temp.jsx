// this below form is fully working with leads status and note update just refactored for clarity and can be directly pasfed in candidatelist.jsx



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCandidates,
  updateCandidateStatus,
} from "../../app/slices/candidateSlice";
import "./CandidateList.css";
import Layout from "../../Layout/Layout";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { fetchJobsAsync } from "../../app/slices/jobSlice";
import { toast } from "react-toastify";

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
  const [newNote, setNewNote] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCandidates());
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  const jobs = useSelector((state) => state.jobs.jobs); // array of all jobs
  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => j.jobId === jobId);
    return job ? job.title : jobId; // fallback to ID if job not found
  };

  const filteredCandidates =
    filterStatus === "All"
      ? candidates
      : candidates.filter((c) => (c.status || "New") === filterStatus);

  const handleStatusUpdate = async (candidateId) => {
    if (!newStatus) {
      toast.error("Please select a status before updating.");
      return;
    }

    try {
      await dispatch(
        updateCandidateStatus({
          id: candidateId,
          updateData: { status: newStatus, note: newNote },
        })
      ).unwrap();

      toast.success("Candidate status and note updated successfully!");
      setUpdatingCandidateId(null); // Reset editing state
      setNewStatus(""); // Clear the status dropdown
      setNewNote(""); // Clear the note textarea
    } catch (error) {
      toast.error(`Failed to update status: ${error}`);
    }
  };

  const handleCancelUpdate = () => {
    setUpdatingCandidateId(null); // Close edit mode
    setNewStatus(""); // Clear the status dropdown
    setNewNote(""); // Clear the note textarea
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
                <th>Status</th>
                <th>Applied For</th> <th></th> {/* for expand button */}
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.length ? (
                filteredCandidates.map((candidate) => (
                  <>
                    <tr
                      key={candidate._id}
                      onClick={() =>
                        setExpandedRowId(
                          expandedRowId === candidate._id ? null : candidate._id
                        )
                      }
                      className={`candidate-row ${
                        expandedRowId === candidate._id ? "expanded" : ""
                      }`}
                    >
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.mobile}</td>
                      <td>{candidate.status || "New"}</td>
                      <td>{getJobTitle(candidate.appliedFor)}</td>
                      <td>
                        <button
                          onClick={() =>
                            setExpandedRowId(
                              expandedRowId === candidate._id
                                ? null
                                : candidate._id
                            )
                          }
                          className="expand-btn"
                        >
                          {expandedRowId === candidate._id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRowId === candidate._id && (
                      <tr className="expanded-row">
                        <td colSpan={6}>
                          <div className="expanded-content">
                            <p>
                              <strong>City:</strong> {candidate.city || "—"}
                            </p>
                            <p>
                              <strong>DOB:</strong> {formatDate(candidate.dob)}
                            </p>
                            <p>
                              <strong>Degree:</strong> {candidate.degree}
                            </p>
                            <p>
                              <strong>Branch:</strong> {candidate.branch}
                            </p>
                            <p>
                              <strong>College:</strong> {candidate.college}
                            </p>
                            <p>
                              <strong>University:</strong>{" "}
                              {candidate.university}
                            </p>
                            <p>
                              <strong>Year of Passout:</strong>{" "}
                              {candidate.yearOfPassout}
                            </p>
                            <p>
                              <strong>Skills:</strong>{" "}
                              {candidate.skills?.join(", ")}
                            </p>
                            <p>
                              <strong>Occupation:</strong>{" "}
                              {candidate.occupation}
                            </p>
                            <p>
                              <strong>Current Salary:</strong>{" "}
                              {candidate.currentSalary}
                            </p>
                            <p>
                              <strong>Preferred Course:</strong>{" "}
                              {candidate.preferredCourse}
                            </p>
                            <p>
                              <strong>Source:</strong> {candidate.source}
                            </p>
                            <p>
                              <strong>Referral Code:</strong>{" "}
                              {candidate.referralCode}
                            </p>
                            <p>
                              <strong>LinkedIn:</strong>{" "}
                              <a
                                href={candidate.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Profile
                              </a>
                            </p>
                            <p>
                              <strong>Registered At:</strong>{" "}
                              {formatDate(candidate.createdAt)}
                            </p>
                            {filterStatus !== "New" && (
                              <p>
                                <strong>Last Comment:</strong> {candidate.note}
                              </p>
                            )}
                            {filterStatus === "New" && (
                              <td
                                style={{
                                  display: "flex",
                                  gap: "1rem",
                                  alignItems: "center",
                                }}
                              >
                                {/* Update Status Button or Status Update Form */}
                                {updatingCandidateId === candidate._id ? (
                                  <>
                                    <select
                                      value={newStatus}
                                      onChange={(e) =>
                                        setNewStatus(e.target.value)
                                      }
                                      style={{
                                        padding: "0.3rem",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                      }}
                                    >
                                      <option value="">Select status</option>
                                      <option value="Contacted">
                                        Contacted
                                      </option>
                                      <option value="Interested">
                                        Interested
                                      </option>
                                      <option value="Rejected">Rejected</option>
                                    </select>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: "1rem",
                                      }}
                                    >
                                      <textarea
                                        value={newNote}
                                        onChange={(e) =>
                                          setNewNote(e.target.value)
                                        }
                                        rows={3}
                                        placeholder="Enter note..."
                                        style={{
                                          padding: "0.5rem",
                                          borderRadius: "4px",
                                          border: "1px solid #ccc",
                                          resize: "vertical",
                                          width: "250px",
                                          marginRight: "0.5rem",
                                        }}
                                      />
                                    </div>
                                    <button
                                      className="lead-btn lead-btn-primary"
                                      onClick={() =>
                                        handleStatusUpdate(candidate._id)
                                      }
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="lead-btn lead-btn-secondary"
                                      onClick={handleCancelUpdate}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="lead-btn lead-btn-primary"
                                    onClick={() =>
                                      setUpdatingCandidateId(candidate._id)
                                    }
                                  >
                                    Update Status
                                  </button>
                                )}
                              </td>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
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
