import React, { useState, useEffect, useRef } from "react";
import { FaDownload, FaPlus, FaEraser, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

import {
  fetchCandidatesThunk,
  deleteCandidateThunk,
  setFilters,
  setPage,
  updateCandidateOutreachThunk,
} from "../../app/slices/candidateSlice.js"; // Update to your actual imports
import Layout from "../../Layout/Layout.jsx";
import FollowUpDateFilter from "../../components/FollowUpDateFilter";
import { normalizeDate } from "../../utils/dateUtils"; // Assuming utils helpers for formatting dates
import { toast } from "react-toastify";
import {
  clearLogs,
  fetchActivityLogsThunk,
} from "../../app/slices/activityLogSlice";
import { fetchAllUsersThunk } from "../../app/slices/userSlice.js";
import { useAuth } from "../../context/auth.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import TransferModal from "../CollegeOutreachDashboard/TransferModal.jsx";
import useModals from "../../hooks/useModals.js";
import UpdateOutreachModal from "./UpdateOutreachModal.jsx";
import ActivityLogsModal from "../CollegeOutreachDashboard/ActivityLogsModal.jsx";
import EditCandidateForm from "./EditCandidateForm.jsx";
import CandidateTable from "./CandidateTable.jsx";

const statuses = [
  "New",
  "Contacted",
  "Interested",
  "Follow-Up",
  "Meeting Scheduled",
  "Enrolled",
  "Not Interested",
  "Rejected",
];

const CandidateOutreachDashboard = () => {
  const { token, user } = useAuth();
  const { modals, openModal, closeModal } = useModals();
  const dispatch = useDispatch();
  const { candidates, filters, page, totalPages, loading, error } = useSelector(
    (state) => state.candidates
  );
  const jobs = useSelector((state) => state.jobs.jobs);
  const { users } = useSelector((state) => state.users);

  const [showEditCandidateForm, setShowEditCandidateForm] = useState(false);
  const [editCandidateData, setEditCandidateData] = useState({});
  // Logs modal state
  const [showLogsFor, setShowLogsFor] = useState(null);

  const { logs: activityLogs, loading: logsLoading } = useSelector(
    (state) => state.activityLogs
  );

  const [outreachFormData, setOutreachFormData] = useState({
    status: "",
    note: "",
    followUpDate: "",
  });

  const [transferCandidateId, setTransferCandidateId] = useState(null);

  const openTransferModal = (candidate) => {
    setTransferCandidateId(candidate._id);
    openModal("transfer");
  };

  const openEditCandidateModal = (candidate) => {
    const basicData = {
      name: candidate.name || "",
      mobile: candidate.mobile || "",
      email: candidate.email || "",
      preferredCourse: candidate.preferredCourse || "",
    };
    setEditCandidateData({ ...basicData, _id: candidate._id });
    setShowEditCandidateForm(true);
  };

  useEffect(() => {
    if (!token) return;
    const delay = setTimeout(() => {
      dispatch(fetchCandidatesThunk({ token }));
      dispatch(fetchAllUsersThunk());
    }, 300);
    return () => clearTimeout(delay);
  }, [token, filters, page, dispatch]);

  const handleCandidateTransfer = async (newUserId) => {
    if (!transferCandidateId) return;

    try {
      // Assuming updateCandidateOutreachThunk can update the assignedTo field
      await dispatch(
        updateCandidateOutreachThunk({
          token,
          id: transferCandidateId,
          updateData: { assignedTo: newUserId },
        })
      ).unwrap();

      toast.success("Candidate transferred successfully");
      closeModal("transfer");
    } catch (error) {
      toast.error("Failed to transfer candidate");
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the candidate.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(
          deleteCandidateThunk({ token, id: candidateId })
        ).unwrap();
        toast.success("Candidate deleted successfully");
      } catch (error) {
        toast.error("Failed to delete candidate");
      }
    }
  };
  // Dropdown menu open state per candidate id
  const [, setOpenActionsId] = useState(null);
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

  // Fetch logs handler
  const fetchLogsHandler = async (candidateId) => {
    if (!token || !candidateId) return;

    try {
      await dispatch(
        fetchActivityLogsThunk({
          token,
          modelType: "Candidate",
          modelId: candidateId,
        })
      ).unwrap();

      setShowLogsFor(candidateId); // only show modal if successful
    } catch (err) {
      toast.error(err || "Failed to fetch activity logs");
    }
  };

  const [modalCandidateId, setModalCandidateId] = useState(null);
  const openUpdateOutreachModal = (candidate, markContacted = false) => {
    const details = candidate.outreachDetails || {};
    setModalCandidateId(candidate._id);
    const formattedFollowUpDate = normalizeDate(details.followUpDate);
    setOutreachFormData({
      status: details.status || "",
      note: details.note || "",
      followUpDate: formattedFollowUpDate,
      assignedTo: details.assignedTo?._id || "",
    });

    openModal("outreach");
  };

  const handleOutreachFormChange = (e) => {
    const { name, value } = e.target;
    setOutreachFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOutreachModalSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      // Dispatch an action to update outreach details for the candidate
      await dispatch(
        updateCandidateOutreachThunk({
          token,
          id: modalCandidateId,
          updateData: outreachFormData,
        })
      ).unwrap();

      toast.success("Outreach status updated successfully.");
      closeModal("outreach");
    } catch (error) {
      toast.error("Failed to update outreach status.");
    }
  };
  const [showDateFilter, setShowDateFilter] = useState(false);

  const hasSetDefaultFollowUp = useRef(false);

  useEffect(() => {
    if (
      !filters.followUpStartDate &&
      !filters.followUpEndDate &&
      !hasSetDefaultFollowUp.current
    ) {
      const today = new Date().toLocaleDateString("en-CA");
      dispatch(
        setFilters({
          ...filters,
          followUpStartDate: today,
          followUpEndDate: today,
        })
      );
      hasSetDefaultFollowUp.current = true;
    }
  }, [filters, dispatch]);

  const [showAssignedFilter, setShowAssignedFilter] = useState(true);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ ...filters, [key]: value }));
  };

  // Get job title by ID
  const getJobTitle = (jobId) => {
    const job = jobs.find((job) => job.jobId === jobId);
    return job ? job.title : jobId; // Fallback to ID if job not found
  };

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteModalData, setNoteModalData] = useState({ note: "", name: "" });

  const openNoteModal = (note, name) => {
    setNoteModalData({ note, name });
    setShowNoteModal(true);
  };

  const hasSetDefaultAssignedTo = useRef(false);

  useEffect(() => {
    if (user && filters.assignedTo === "" && !hasSetDefaultAssignedTo.current) {
      dispatch(setFilters({ ...filters, assignedTo: user._id }));
      setShowAssignedFilter(true);
      hasSetDefaultAssignedTo.current = true;
    }
  }, [user, dispatch, filters]);

  return (
    <Layout>
      <div className="clg-container">
        <div className="clg-top-row">
          <h2 className="clg-page-title">Students Outreach Tracker</h2>
          <button
            className="btn-secondary btn-with-icon"
            onClick={() => toast.info("Export functionality coming soon!")}
          >
            Export as Excel <FaDownload />
          </button>
        </div>
        <p>Total Candidates: {candidates.length}</p>

        {/* Filters */}
        <div className="clg-filters-row">
          <div></div>
          <div>
            <button
              className="btn-with-icon btn-primary"
              onClick={() =>
                toast.info(
                  "Please ask the student to register through the website."
                )
              }
            >
              <FaPlus /> Add Candidate
            </button>
          </div>
          <input
            placeholder="Search candidates..."
            type="search"
            value={filters.search}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, search: e.target.value }))
            }
            className="clg-input clg-search-input"
            aria-label="Search candidates"
          />
          <div></div>
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
          {/* Assigned To filter */}
          {showAssignedFilter && filters.assignedTo === user._id ? (
            <div className="enabled-filter-wrapper">
              <span className="enabled-filter-highlight">Assigned to: Me</span>
              <button
                onClick={() => {
                  dispatch(setFilters({ ...filters, assignedTo: "" }));
                  setShowAssignedFilter(false);
                }}
                className="btn-clear-x btn-with-icon"
                aria-label="Clear assigned to filter"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <select
              value={filters.assignedTo}
              onChange={(e) => {
                dispatch(
                  setFilters({ ...filters, assignedTo: e.target.value })
                );
                setShowAssignedFilter(true); // re-show the label if user picks themselves
              }}
              className="clg-select"
              aria-label="Filter by Assigned To"
            >
              <option value="">Assigned To</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}

          {/* Date Range */}
          {!showDateFilter ? (
            <div className="enabled-filter-wrapper">
              <span className="followup-highlight">Today's Follow-Up</span>
              <button
                onClick={() => {
                  dispatch(
                    setFilters({
                      ...filters,
                      followUpStartDate: "",
                      followUpEndDate: "",
                    })
                  );
                  setShowDateFilter(true);
                }}
                className="btn-clear-x btn-with-icon"
                aria-label="Clear follow-up filter"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <FollowUpDateFilter
              filters={filters}
              dispatch={dispatch}
              setFilters={setFilters}
            />
          )}

          {/* Location */}
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="clg-select"
            aria-label="Filter by Location"
            disabled
            style={{ cursor: "not-allowed" }}
          >
            <option value="">All Locations</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>

          {/* Optional Clear Filters Button */}
          <div>
            <button
              className="btn-secondary btn-clear-filters btn-with-icon"
              onClick={() => {
                dispatch(
                  setFilters({
                    search: "",
                    status: "",
                    assignedTo: "",
                    city: "",
                    createdBy: "",
                    followUpStartDate: "",
                    followUpEndDate: "",
                  })
                );
                setShowDateFilter(true);
                setShowAssignedFilter(false);
              }}
            >
              <FaEraser /> Clear Filters
            </button>
          </div>
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
          <CandidateTable
            candidates={candidates}
            filters={filters}
            page={page}
            totalPages={totalPages}
            user={user}
            loading={loading.fetch}
            error={error}
            dispatch={dispatch}
            setPage={setPage}
            getJobTitle={getJobTitle}
            openUpdateOutreachModal={openUpdateOutreachModal}
            fetchLogsHandler={fetchLogsHandler}
            openTransferModal={openTransferModal}
            openEditCandidateModal={openEditCandidateModal}
            handleDeleteCandidate={handleDeleteCandidate}
            openNoteModal={openNoteModal}
          />
        )}

        <Modal
          show={modals.outreach}
          onClose={() => closeModal("outreach")}
          title="Update Candidate Outreach"
        >
          <UpdateOutreachModal
            outreachFormData={outreachFormData}
            handleChange={handleOutreachFormChange}
            handleSubmit={handleOutreachModalSubmit}
            loading={loading.updateOutreach}
          />
        </Modal>
        <Modal
          show={modals.transfer}
          onClose={() => closeModal("transfer")}
          title="Transfer Candidate Lead to "
        >
          <TransferModal
            users={users} // List of users you want to assign the candidate to
            currentAssignedToId={
              candidates.find((c) => c._id === transferCandidateId)
                ?.outreachDetails?.assignedTo?._id || ""
            }
            onTransfer={handleCandidateTransfer} // This handler will handle the transfer logic for candidates
            loading={loading.updateOutreach}
            entityType="Candidate"
            onClose={() => closeModal("transfer")}
          />
        </Modal>

        {/* Logs Modal */}
        <Modal
          show={!!showLogsFor}
          onClose={() => {
            dispatch(clearLogs());
            setShowLogsFor(null);
          }}
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
          show={showEditCandidateForm}
          onClose={() => setShowEditCandidateForm(false)}
          title="Edit Candidate"
        >
          <EditCandidateForm
            formData={editCandidateData}
            setFormData={setEditCandidateData}
            onClose={() => setShowEditCandidateForm(false)}
          />
        </Modal>
        <Modal
          show={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          title={`Note for ${noteModalData.name || "College"}`}
          width="600px"
        >
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {noteModalData.note}
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CandidateOutreachDashboard;
