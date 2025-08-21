// CandidateTable.jsx
import React, { useState } from "react";
import { FaCheckCircle, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { formatDisplayDate } from "../../utils/dateUtils";
import CandidateActionsDropdown from "./CandidateActionsDropdown";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import CandidateDetailsModal from "./CandidateDetailsModal";

const CandidateTable = ({
  candidates,
  filters,
  page,
  totalPages,
  user,
  loading,
  error,
  dispatch,
  setPage,
  getJobTitle,
  openUpdateOutreachModal,
  fetchLogsHandler,
  openTransferModal,
  openEditCandidateModal,
  handleDeleteCandidate,
  openNoteModal,
}) => {
  const [detailsCandidate, setDetailsCandidate] = useState(null);

  const handleViewDetails = (candidate) => {
    setDetailsCandidate(candidate);
  };

  return (
    <>
      {loading ? (
        <div className="loading-wrapper">
          <ClipLoader />
          <p className="loading-text">Loading colleges...</p>
        </div>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <table className="clg-table" aria-label="College outreach table">
            <thead>
              <tr>
                <th style={{ borderTopLeftRadius: "10px" }}>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Applied For</th>
                <th>Status</th>
                <th>Note</th>
                <th>Follow up</th>
                <th>Assigned To</th>
                <th style={{ borderTopRightRadius: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={9} className="no-data">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => (
                  <tr
                    key={candidate._id}
                    onClick={() => setDetailsCandidate(candidate)}
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setDetailsCandidate(candidate);
                      }
                    }}
                    aria-label={`View details of ${candidate.name}`}
                  >
                    <td>{candidate.name}</td>
                    <td>{candidate.mobile}</td>
                    <td>{candidate.email}</td>
                    <td>{getJobTitle(candidate.appliedFor)}</td>
                    <td>
                      {candidate.outreachDetails?.status === "New" ? (
                        filters.status === "New" ? (
                          "New"
                        ) : (
                          <button
                            className={`btn-primary btn-with-icon ${
                              !candidate.outreachDetails?.assignedTo
                                ? "disabled-button"
                                : ""
                            }`}
                            onClick={() => {
                              if (!candidate.outreachDetails?.assignedTo) {
                                toast.warn("Assign to someone to make changes");
                              } else {
                                openUpdateOutreachModal(candidate);
                              }
                            }}
                            aria-label="Mark as Contacted"
                            title="Mark as Contacted"
                            style={{
                              cursor: !candidate.outreachDetails?.assignedTo
                                ? "not-allowed"
                                : "pointer",
                              opacity: !candidate.outreachDetails?.assignedTo
                                ? 0.6
                                : 1,
                            }}
                          >
                            Mark as Contacted <FaCheckCircle size={20} />
                          </button>
                        )
                      ) : (
                        candidate.outreachDetails?.status || (
                          <i className="clg-placeholder-text">N/A</i>
                        )
                      )}
                    </td>
                    <td>
                      {candidate.outreachDetails?.note ? (
                        <div className="clg-notes-preview-wrapper">
                          <div className="clg-notes-preview-text">
                            {candidate.outreachDetails.note}
                          </div>
                          <button
                            className="btn-view-note"
                            onClick={() =>
                              openNoteModal(
                                candidate.outreachDetails.note,
                                candidate.name
                              )
                            }
                          >
                            View
                          </button>
                        </div>
                      ) : (
                        <i className="clg-placeholder-text">No Note</i>
                      )}
                    </td>
                    <td>
                      {candidate.outreachDetails?.followUpDate ? (
                        formatDisplayDate(
                          candidate.outreachDetails.followUpDate
                        )
                      ) : (
                        <i className="clg-placeholder-text">No date</i>
                      )}
                    </td>
                    <td>
                      {candidate.outreachDetails?.assignedTo?.name ||
                        "Unassigned"}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <CandidateActionsDropdown
                        candidate={candidate}
                        openUpdateOutreachModal={openUpdateOutreachModal}
                        fetchLogsHandler={fetchLogsHandler}
                        openTransferModal={openTransferModal}
                        openEditCandidateModal={openEditCandidateModal}
                        handleDeleteCandidate={handleDeleteCandidate}
                        userRole={user.role}
                        user={user}
                        onViewDetails={handleViewDetails}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="clg-pagination">
            <button
              className="btn-secondary btn-with-icon"
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
            >
              <FaAngleLeft />
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="btn-secondary btn-with-icon"
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next <FaAngleRight />
            </button>
          </div>

          {/* Modal to show full candidate info */}
          <Modal
            show={!!detailsCandidate}
            onClose={() => setDetailsCandidate(null)}
            title={`Details of ${detailsCandidate?.name || "Candidate"}`}
            width="600px"
          >
            <CandidateDetailsModal candidate={detailsCandidate} />
          </Modal>
        </>
      )}
    </>
  );
};

export default CandidateTable;
