import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import {
  deleteCollegeThunk,
  fetchColleges,
  setFilters,
  setPage,
  updateCollegeOutreachThunk,
} from "../../app/slices/collegeSlice";
import { useSelector, useDispatch } from "react-redux";
import "./CollegeOutreachDashboard.css";
import Layout from "../../Layout/Layout";
import { fetchLogs } from "../../services/collegeService";
import { fetchAllUsersThunk } from "../../app/slices/userSlice";
import { FaDownload } from "react-icons/fa6";
import CollegeActionsDropdown from "./CollegeForm/CollegeActionsDropdown.jsx";
import CollegeForm from "./CollegeForm";
import EditOutreachModal from "./EditOutreachModal/EditOutreachModal.jsx";
import ActivityLogsModal from "./ActivityLogsModal.jsx";
import TransferModal from "./TransferModal.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { FaPlus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { formatDisplayDate } from "../../utils/dateUtils.js";

const statuses = [
  "Not Contacted",
  "Contacted",
  "Follow-Up",
  "Meeting Scheduled",
  "Not Interested",
  "Signed Up",
];

const CollegeOutreachDashboard = () => {
  const { token, user } = useAuth();
  const dispatch = useDispatch();

  const { colleges, filters, page, totalPages, loading, error } = useSelector(
    (state) => state.colleges
  );

  console.log("Colleges data:", colleges);

  const { users } = useSelector((state) => state.users);

  // Logs modal state
  const [showLogsFor, setShowLogsFor] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // Dropdown menu open state per college id
  const [, setOpenActionsId] = useState(null);

  // Modal states
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [showAddCollegeForm, setShowAddCollegeForm] = useState(false);
  const [modalCollegeId, setModalCollegeId] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferCollegeId, setTransferCollegeId] = useState(null);
  const [showEditCollegeForm, setShowEditCollegeForm] = useState(false);
  const [editCollegeData, setEditCollegeData] = useState(null);

  const openTransferModal = (college) => {
    setTransferCollegeId(college._id);
    setShowTransferModal(true);
  };
  const handleTransfer = async (newUserId) => {
    if (!transferCollegeId) return;

    try {
      // Assuming updateCollegeOutreachThunk can update assignedTo field, otherwise create a new thunk
      await dispatch(
        updateCollegeOutreachThunk({
          token,
          id: transferCollegeId,
          updateData: { assignedTo: newUserId },
        })
      ).unwrap();

      toast.success("College transferred successfully");
      setShowTransferModal(false);
    } catch (error) {
      toast.error("Failed to transfer college");
    }
  };

  const openEditCollegeModal = (college) => {
    const basicData = {
      name: college.name || "",
      location: college.location || "",
      contactPerson: college.contactPerson || "",
      contactEmail: college.contactEmail || "",
      contactPhone: college.contactPhone || "",
      assignedTo: college.outreachDetails?.assignedTo?._id || "",
    };
    setEditCollegeData({ ...basicData, _id: college._id });
    setShowEditCollegeForm(true);
  };

  // Form state for Outreach modal (Edit only)
  const [outreachFormData, setOutreachFormData] = useState({
    status: "",
    notes: "",
    followUpDate: "",
  });

  // Fetch colleges & users on load & filters/page/token change
  useEffect(() => {
    if (!token) return;
    const delay = setTimeout(() => {
      dispatch(fetchColleges({ token }));
      dispatch(fetchAllUsersThunk());
    }, 300);
    return () => clearTimeout(delay);
  }, [token, filters, page, dispatch]);

  // Fetch logs handler
  const fetchLogsHandler = async (collegeId) => {
    setLogsLoading(true);
    try {
      const data = await fetchLogs(token, collegeId);
      setActivityLogs(data);
      setShowLogsFor(collegeId);
    } catch {
      toast.error("Failed to fetch activity logs");
    } finally {
      setLogsLoading(false);
    }
  };

  // Open Edit Outreach modal with college data
  const openEditOutreachModal = (college) => {
    const details = college.outreachDetails || {};
    setModalCollegeId(college._id);
    const formattedFollowUpDate = details.followUpDate
      ? new Date(details.followUpDate).toISOString().split("T")[0] // Extract YYYY-MM-DD
      : "";
    setOutreachFormData({
      status: details.status || "",
      notes: details.notes || "",
      previousFollowUpDate: formattedFollowUpDate,
      assignedTo: details.assignedTo?._id || "",
    });
    console.log(outreachFormData);

    setShowOutreachModal(true);
  };

  // Handle input changes for outreach modal form
  const handleOutreachFormChange = (e) => {
    const { name, value } = e.target;
    setOutreachFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Edit Outreach modal form
  const handleOutreachModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalCollegeId) return;

    // Prepare data - followUpDate can be empty string => null
    const updateData = {
      ...outreachFormData,
    };

    // Only include followUpDate if it has been modified
    if (
      outreachFormData.followUpDate === outreachFormData.previousFollowUpDate
    ) {
      // Remove followUpDate from the request if it wasn't changed
      delete updateData.followUpDate;
    }

    try {
      await dispatch(
        updateCollegeOutreachThunk({ token, id: modalCollegeId, updateData })
      ).unwrap();
      toast.success("Outreach details updated");
      setShowOutreachModal(false);
    } catch {
      setShowOutreachModal(false);
      toast.error("Failed to update outreach details");
    }
  };

  const closeOutreachModal = () => setShowOutreachModal(false);

  // Dropdown close on outside click
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenActionsId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteCollege = async (collegeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the college.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteCollegeThunk({ token, id: collegeId })).unwrap();
        toast.success("College deleted successfully");
      } catch (error) {
        toast.error("Failed to delete college");
      }
    }
  };

  const userRole = user?.role || "viewer"; // fallback to viewer if not found

  return (
    <Layout>
      <div className="clg-container">
        <div className="clg-top-row">
          <h2 className="clg-page-title">College Outreach Tracker</h2>
          <button className="btn-secondary">
            Export as Excel <FaDownload style={{ marginLeft: 6 }} />
          </button>
        </div>

        {/* Filters */}
        <div className="clg-filters-row">
          <button
            className="btn-with-icon btn-primary"
            onClick={() => setShowAddCollegeForm(true)}
          >
            <FaPlus /> Add College
          </button>
          <input
            placeholder="Search colleges..."
            value={filters.search}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, search: e.target.value }))
            }
            className="clg-input clg-search-input"
            aria-label="Search colleges"
          />
          <select
            value={filters.status}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, status: e.target.value }))
            }
            className="clg-select"
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {/* <button
            className="btn-secondary"
            onClick={() => dispatch(setFilters({ search: "", status: "" }))}
          >
            Clear Filters
          </button> */}
        </div>

        {loading.fetch ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              flexDirection: "column",
            }}
          >
            <ClipLoader />
            <p className="loading-text"> Loading colleges...</p>
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <table className="clg-table" aria-label="College outreach table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Contact Person</th>
                  <th>Contact Email</th>
                  <th>Contact Phone</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Follow-Up Date</th>
                  <th>Assigned To</th>
                  <th></th>
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
                        {college.name || (
                          <i className="clg-placeholder-text">N/A</i>
                        )}
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
                        {college.outreachDetails?.status || (
                          <i className="clg-placeholder-text">N/A</i>
                        )}
                      </td>
                      <td>
                        {college.outreachDetails?.notes ? (
                          <pre className="clg-notes-pre">
                            {college.outreachDetails.notes}
                          </pre>
                        ) : (
                          <i className="clg-placeholder-text">No notes</i>
                        )}
                      </td>
                      <td>
                        {college.outreachDetails?.followUpDate ? (
                          formatDisplayDate(
                            college.outreachDetails.followUpDate
                          )
                        ) : (
                          <i className="clg-placeholder-text">No date</i>
                        )}
                      </td>
                      {/* <td>
                        {college.outreachDetails?.followUpDate ? (
                          new Date(
                            college.outreachDetails.followUpDate
                          ).toLocaleDateString()
                        ) : (
                          <i className="clg-placeholder-text">No date</i>
                        )}
                      </td> */}

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
                className="btn-secondary"
                disabled={page === 1}
                onClick={() => dispatch(setPage(page - 1))}
                aria-label="Previous page"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn-secondary"
                disabled={page === totalPages}
                onClick={() => dispatch(setPage(page + 1))}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Logs Modal */}
        <Modal
          show={!!showLogsFor}
          onClose={() => setShowLogsFor(null)}
          title="Activity Logs"
        >
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <ActivityLogsModal
              logs={activityLogs}
              loading={logsLoading}
              onClose={() => setShowLogsFor(null)}
            />
          </div>
        </Modal>

        <Modal
          show={showOutreachModal}
          onClose={closeOutreachModal}
          title="Edit Outreach Details"
        >
          <EditOutreachModal
            onClose={closeOutreachModal}
            outreachFormData={outreachFormData}
            handleChange={handleOutreachFormChange}
            handleSubmit={handleOutreachModalSubmit}
            users={users}
            loading={loading.updateOutreach}
          />
        </Modal>
      </div>
      <Modal
        show={showEditCollegeForm}
        onClose={() => setShowEditCollegeForm(false)}
        title="Edit College Details"
      >
        <CollegeForm
          onClose={() => setShowEditCollegeForm(false)}
          initialData={editCollegeData}
          editMode={true}
          collegeId={editCollegeData?._id}
        />
      </Modal>
      <Modal
        show={showAddCollegeForm}
        onClose={() => setShowAddCollegeForm(false)}
        title="Add New College"
      >
        <CollegeForm onClose={() => setShowAddCollegeForm(false)} />
      </Modal>

      <Modal
        show={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        title="Transfer College Lead to "
      >
        <TransferModal
          users={users}
          currentAssignedToId={
            colleges.find((c) => c._id === transferCollegeId)?.outreachDetails
              ?.assignedTo?._id || ""
          }
          onClose={() => setShowTransferModal(false)}
          onTransfer={handleTransfer}
          loading={loading.updateOutreach}
        />
      </Modal>
    </Layout>
  );
};

export default CollegeOutreachDashboard;
