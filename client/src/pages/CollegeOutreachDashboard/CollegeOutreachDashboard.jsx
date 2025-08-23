import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import {
  deleteCollegeThunk,
  fetchColleges,
  setFilters,
  updateCollegeOutreachThunk,
} from "../../app/slices/collegeSlice";
import { useSelector, useDispatch } from "react-redux";
import "./CollegeOutreachDashboard.css";
import Layout from "../../Layout/Layout";
import { fetchAllUsersThunk } from "../../app/slices/userSlice";
import { FaDownload } from "react-icons/fa6";
import CollegeForm from "./CollegeForm";
import EditOutreachModal from "./EditOutreachModal/EditOutreachModal.jsx";
import ActivityLogsModal from "./ActivityLogsModal.jsx";
import TransferModal from "./TransferModal.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { FaEraser, FaPlus, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { normalizeDate } from "../../utils/dateUtils.js";
import FollowUpDateFilter from "../../components/FollowUpDateFilter.jsx";
import useModals from "../../hooks/useModals.js";
import {
  clearLogs,
  fetchActivityLogsThunk,
} from "../../app/slices/activityLogSlice.js";
import CollegeTable from "./CollegeTable.jsx";
// import ActiveFiltersRow from "../../components/ActiveFiltersRow/ActiveFiltersRow.jsx";

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
  const { modals, openModal, closeModal } = useModals();

  const { colleges, filters, page, totalPages,totalCount, loading, error } = useSelector(
    (state) => state.colleges
  );

  // console.log("Colleges data:", colleges);

  const { users } = useSelector((state) => state.users);

  // Logs modal state
  const [showLogsFor, setShowLogsFor] = useState(null);

  const { logs: activityLogs, loading: logsLoading } = useSelector(
    (state) => state.activityLogs
  );

  // Dropdown menu open state per college id
  const [, setOpenActionsId] = useState(null);

  // Modal states
  const [showAddCollegeForm, setShowAddCollegeForm] = useState(false);
  const [modalCollegeId, setModalCollegeId] = useState(null);
  const [transferCollegeId, setTransferCollegeId] = useState(null);
  const [showEditCollegeForm, setShowEditCollegeForm] = useState(false);
  const [editCollegeData, setEditCollegeData] = useState(null);

  const openTransferModal = (college) => {
    setTransferCollegeId(college._id);
    openModal("transfer");
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
      closeModal("transfer");
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
    note: "",
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

  const hasSetDefaultAssignedTo = useRef(false);

  useEffect(() => {
    if (user && filters.assignedTo === "" && !hasSetDefaultAssignedTo.current) {
      dispatch(setFilters({ ...filters, assignedTo: user._id }));
      setShowAssignedFilter(true);
      hasSetDefaultAssignedTo.current = true;
    }
  }, [user, dispatch, filters]);

  // Fetch logs handler
  const fetchLogsHandler = async (collegeId) => {
    if (!token || !collegeId) return;

    try {
      await dispatch(
        fetchActivityLogsThunk({
          token,
          modelType: "College",
          modelId: collegeId,
        })
      ).unwrap();

      setShowLogsFor(collegeId); // only show modal if successful
    } catch (err) {
      toast.error(err || "Failed to fetch activity logs");
    }
  };

  // Open Edit Outreach modal with college data
  const openEditOutreachModal = (college, markContacted = false) => {
    const details = college.outreachDetails || {};
    setModalCollegeId(college._id);
    const formattedFollowUpDate = normalizeDate(details.followUpDate);
    setOutreachFormData({
      status: markContacted ? "Contacted" : details.status || "",
      note: details.note || "",
      previousFollowUpDate: formattedFollowUpDate,
      followUpDate: formattedFollowUpDate || "",
      assignedTo: details.assignedTo?._id || "",
    });
    // console.log(outreachFormData);

    openModal("outreach");
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
      closeModal("outreach");
    } catch {
      closeModal("outreach");
      toast.error("Failed to update outreach details");
    }
  };

  const closeOutreachModal = () => closeModal("outreach");

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

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ ...filters, [key]: value }));
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

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteModalData, setNoteModalData] = useState({ note: "", name: "" });

  return (
    <Layout>
      <div className="clg-container">
        <div className="clg-top-row">
          <h2 className="clg-page-title">College Outreach Tracker</h2>
          <button
            className="btn-secondary btn-with-icon"
            onClick={() => toast.info("Export functionality coming soon!")}
          >
            Export as Excel <FaDownload />
          </button>
        </div>

        {/* Filters */}
        <div className="clg-filters-row">
          <div>
            <button
              className="btn-with-icon btn-primary"
              onClick={() => setShowAddCollegeForm(true)}
            >
              <FaPlus /> Add College
            </button>
          </div>
          <input
            placeholder="Search colleges..."
            type="search"
            value={filters.search}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, search: e.target.value }))
            }
            className="clg-input clg-search-input"
            aria-label="Search colleges"
          /><p>
          {Object.values(filters).some((val) => val)
            ? `Filtered Colleges: ${totalCount}`
            : `Total Colleges: ${totalCount}`}
        </p>
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
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
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
          {/* Created By */}
          <select
            value={filters.createdBy}
            onChange={(e) => handleFilterChange("createdBy", e.target.value)}
            className="clg-select"
            aria-label="Filter by Created By"
          >
            <option value="">Created By</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
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
                    location: "",
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
        {/* Active Filters Row 
        <ActiveFiltersRow
          filters={filters}
          dispatch={dispatch}
          setFilters={setFilters}
          users={users}
          showAssignedFilter={showAssignedFilter}
          setShowAssignedFilter={setShowAssignedFilter}
          setShowDateFilter={setShowDateFilter}
        />*/}

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
          <CollegeTable
            colleges={colleges}
            page={page}
            totalPages={totalPages}
            user={user}
            filters={filters}
            setShowNoteModal={setShowNoteModal}
            setNoteModalData={setNoteModalData}
            openEditOutreachModal={openEditOutreachModal}
            fetchLogsHandler={fetchLogsHandler}
            openTransferModal={openTransferModal}
            openEditCollegeModal={openEditCollegeModal}
            handleDeleteCollege={handleDeleteCollege}
          />
        )}

        {/* Logs Modal */}
        <Modal
          show={!!showLogsFor}
          onClose={() => {
            dispatch(clearLogs()); // <- Clear Redux state
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
          show={modals.outreach}
          onClose={() => closeModal("outreach")}
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
        show={modals.transfer}
        onClose={() => closeModal("transfer")}
        title="Transfer College Lead to "
      >
        <TransferModal
          users={users}
          currentAssignedToId={
            colleges.find((c) => c._id === transferCollegeId)?.outreachDetails
              ?.assignedTo?._id || ""
          }
          onClose={() => closeModal("transfer")}
          onTransfer={handleTransfer}
          loading={loading.updateOutreach}
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
    </Layout>
  );
};

export default CollegeOutreachDashboard;
