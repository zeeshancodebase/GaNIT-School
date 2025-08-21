import React from "react";
import { FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPage } from "../../app/slices/collegeSlice";
import { formatDisplayDate } from "../../utils/dateUtils";
import CollegeActionsDropdown from "./CollegeActionsDropdown/CollegeActionsDropdown";

const CollegeTable = ({
  colleges,
  page,
  totalPages,
  user,
  filters,
  setShowNoteModal,
  setNoteModalData,
  openEditOutreachModal,
  fetchLogsHandler,
  openTransferModal,
  openEditCollegeModal,
  handleDeleteCollege,
}) => {
  const dispatch = useDispatch();
  const userRole = user?.role || "viewer";

  const openNoteModal = (note, name) => {
    setNoteModalData({ note, name });
    setShowNoteModal(true);
  };

  return (
    <>
      <table className="clg-table" aria-label="College outreach table">
        <thead>
          <tr>
            <th style={{ borderTopLeftRadius: "10px" }}>Name</th>
            <th>Location</th>
            <th>Contact Person</th>
            <th>Contact Email</th>
            <th>Contact Phone</th>
            <th>
              {" "}
              {filters.status === "Not Contacted" ? "Not Contacted" : "Status"}
            </th>
            <th>Note</th>
            <th>Follow-Up</th>
            <th>Assigned To</th>
            <th style={{ borderTopRightRadius: "10px" }}></th>
          </tr>
        </thead>
        <tbody>
          {colleges.length === 0 ? (
            <tr>
              <td colSpan={11} className="no-data">
                No colleges found.
              </td>
            </tr>
          ) : (
            colleges.map((college) => (
              <tr key={college._id}>
                <td>
                  {college.name || <i className="clg-placeholder-text">N/A</i>}
                </td>
                <td>
                  {college.location || (
                    <i className="clg-placeholder-text">N/A</i>
                  )}
                </td>
                <td>
                  {college.contactPerson || (
                    <i className="clg-placeholder-text">N/A</i>
                  )}
                </td>
                <td>
                  {college.contactEmail || (
                    <i className="clg-placeholder-text">N/A</i>
                  )}
                </td>
                <td>
                  {college.contactPhone || (
                    <i className="clg-placeholder-text">N/A</i>
                  )}
                </td>
                <td>
                  {college.outreachDetails?.status === "Not Contacted" ? (
                    <button
                      className="btn-primary btn-with-icon"
                      onClick={() => openEditOutreachModal(college, true)}
                      aria-label="Mark as Contacted"
                      title="Mark as Contacted"
                    >
                      Mark as Contacted <FaCheckCircle size={20} />
                    </button>
                  ) : college.outreachDetails?.status ? (
                    college.outreachDetails.status
                  ) : (
                    <i className="clg-placeholder-text">N/A</i>
                  )}
                </td>

                <td>
                  {college.outreachDetails?.note ? (
                    <div className="clg-notes-preview-wrapper">
                      <div className="clg-notes-preview-text">
                        {college.outreachDetails.note}
                      </div>
                      <button
                        className="btn-view-note"
                        onClick={() =>
                          openNoteModal(
                            college.outreachDetails.note,
                            college.name
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
                  {college.outreachDetails?.followUpDate ? (
                    formatDisplayDate(college.outreachDetails.followUpDate)
                  ) : (
                    <i className="clg-placeholder-text">No date</i>
                  )}
                </td>
                <td>
                  {college.outreachDetails?.assignedTo?.name ? (
                    college.outreachDetails.assignedTo.name
                  ) : (
                    <i className="clg-placeholder-text">Unassigned</i>
                  )}
                </td>
                <td>
                  <CollegeActionsDropdown
                    college={college}
                    openEditOutreachModal={openEditOutreachModal}
                    fetchLogsHandler={fetchLogsHandler}
                    openTransferModal={openTransferModal}
                    openEditCollegeModal={openEditCollegeModal}
                    handleDeleteCollege={handleDeleteCollege}
                    userRole={userRole}
                    user={user}
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
          aria-label="Previous page"
        >
          <FaAngleLeft /> Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn-secondary btn-with-icon"
          disabled={page === totalPages}
          onClick={() => dispatch(setPage(page + 1))}
          aria-label="Next page"
        >
          Next <FaAngleRight />
        </button>
      </div>
    </>
  );
};

export default CollegeTable;
