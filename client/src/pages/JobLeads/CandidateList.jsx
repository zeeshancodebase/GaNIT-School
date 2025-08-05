import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCandidates,
  updateCandidateStatus,
} from "../../app/slices/candidateSlice";
import { fetchJobsAsync } from "../../app/slices/jobSlice";
import { toast } from "react-toastify";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Layout from "../../Layout/Layout";
import CandidateDetails from "./CandidateDetails"; // Extracted details view
import StatusUpdateForm from "./StatusUpdateForm"; // Extracted status update form
import "./CandidateList.css";

// Utility to format date
// const formatDate = (isoDate) => {
//   if (!isoDate) return "—";
//   const date = new Date(isoDate);
//   return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
// };

// Candidate Statuses
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
  const jobs = useSelector((state) => state.jobs.jobs); // Fetching job titles

  const [filterStatus, setFilterStatus] = useState("New");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [editingCandidateId, setEditingCandidateId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");

  // Dispatch fetch actions
  useEffect(() => {
    dispatch(fetchAllCandidates());
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  // Filter candidates by status
  const filteredCandidates =
    filterStatus === "All"
      ? candidates
      : candidates.filter(
          (candidate) => (candidate.status || "New") === filterStatus
        );

  // Get job title by ID
  const getJobTitle = (jobId) => {
    const job = jobs.find((job) => job.jobId === jobId);
    return job ? job.title : jobId; // Fallback to ID if job not found
  };

  // Handle updating candidate status
  const handleStatusUpdate = async (candidateId) => {
    if (!candidateId) {
      toast.error("Invalid candidate ID.");
      return;
    }

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
      resetForm();
    } catch (error) {
      toast.error(`Failed to update status: ${error}`);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewStatus("");
    setNewNote("");
    setEditingCandidateId(null);
  };

  // Conditional rendering based on loading or errors
  if (isLoading) return <p>Loading candidates...</p>;
  if (error) return <p>Error fetching candidates: {error}</p>;
  if (!candidates.length) return <p>No candidates registered yet.</p>;

  return (
    <Layout>
      <div className="candidate-list-container">
        <h2>Registered Candidates</h2>
        <div className="list-header">
          <p>Total Candidates: {candidates.length}</p>
          <div className="filter-controls">
            <label htmlFor="statusFilter">Filter by Status: </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="candidate-table-container">
          <table className="candidate-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Applied For</th>
                <th>Actions</th> {/* Expand/Collapse button */}
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length ? (
                filteredCandidates.map((candidate) => (
                  <React.Fragment key={candidate._id}>
                    <tr
                      onClick={() => {
                        if (expandedRowId === candidate._id) {
                          setExpandedRowId(null);
                          resetForm(); // reset editing states on collapse
                        } else {
                          setExpandedRowId(candidate._id);
                        }
                      }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRowId(
                              expandedRowId === candidate._id
                                ? null
                                : candidate._id
                            );
                          }}
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
                          <CandidateDetails candidate={candidate} />
                          {filterStatus === "New" && (
                            <>
                              {editingCandidateId === candidate._id ? (
                                <StatusUpdateForm
                                  candidate={candidate}
                                  newStatus={newStatus}
                                  newNote={newNote}
                                  setNewStatus={setNewStatus}
                                  setNewNote={setNewNote}
                                  handleStatusUpdate={handleStatusUpdate}
                                  resetForm={resetForm}
                                />
                              ) : (
                                <button
                                  className="lead-btn lead-btn-primary"
                                  onClick={() => {
                                    setEditingCandidateId(candidate._id);
                                    setNewStatus("");
                                    setNewNote("");
                                  }}
                                >
                                  Update Status
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
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
