import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import {
  fetchColleges,
  setFilters,
  setPage,
  addCollegeThunk,
  updateCollegeThunk,
} from "../../app/slices/collegeSlice";
import { useSelector, useDispatch } from "react-redux";
import "./CollegeOutreachDashboard.css"; // import CSS
import Layout from "../../Layout/Layout";
import { fetchLogs } from "../../services/collegeService";
import { fetchAllUsersThunk } from "../../app/slices/userSlice";

const statuses = [
  "Not Contacted",
  "Contacted",
  "Follow-Up",
  "Meeting Scheduled",
  "Not Interested",
  "Signed Up",
];

const CollegeOutreachDashboard = () => {
  const { token} = useAuth();

//   const [editingCollege, setEditingCollege] = useState(null);
  const [showLogsFor, setShowLogsFor] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);

  const fetchLogsHandler = async (collegeId) => {
    setLogsLoading(true);
    try {
      const data = await fetchLogs(token, collegeId);
      setActivityLogs(data);
      setShowLogsFor(collegeId);
    } catch (err) {
      toast.error("Failed to fetch activity logs");
    } finally {
      setLogsLoading(false);
    }
  };

  const dispatch = useDispatch();
  const { colleges, filters, page, totalPages, loading, error } =
    useSelector((state) => state.colleges);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (token) {
        dispatch(fetchColleges({ token }));
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [token, filters, page, dispatch]);

  const updateCollegeField = (id, field, value) => {
    dispatch(updateCollegeThunk({ token, id, field, value }));
  };

  const [newCollegeData, setNewCollegeData] = useState({
    name: "",
    location: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    assignedTo: "",
  });

  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchAllUsersThunk());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollegeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddNewCollege = (e) => {
    e.preventDefault();
    if (!newCollegeData.name) {
      toast.error("College name required");
      return;
    }
    dispatch(addCollegeThunk({ token, collegeData: newCollegeData }));
    console.log("New College Data:", newCollegeData);

    // setNewCollegeData({
    //   name: "",
    //   location: "",
    //   contactPerson: "",
    //   contactEmail: "",
    //   contactPhone: "",
    //   assignedTo: "",
    // });
  };

  return (
    <Layout>
      <div className="clg-container">
        <h2 className="title">College Outreach Tracker</h2>

        {/* Add New College Form */}
        <form onSubmit={handleAddNewCollege} className="form">
          <input
            required
            name="name"
            placeholder="College Name"
            value={newCollegeData.name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="location"
            placeholder="Location"
            value={newCollegeData.location}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="contactPerson"
            placeholder="Contact Person"
            value={newCollegeData.contactPerson}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="contactEmail"
            type="email"
            placeholder="Contact Email"
            value={newCollegeData.contactEmail}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="contactPhone"
            placeholder="Contact Phone"
            value={newCollegeData.contactPhone}
            onChange={handleInputChange}
            className="input"
          />
          <select
            name="assignedTo"
            value={newCollegeData.assignedTo}
            onChange={handleInputChange}
            className="select"
          >
            <option value="">Assign to (optional)</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          <button type="submit" className="btn-primary">
            Add College
          </button>
        </form>

        {/* Filters */}
        <div className="filters">
          <input
            placeholder="Search colleges..."
            value={filters.search}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, search: e.target.value }))
            }
            className="input search-input"
          />

          <select
            value={filters.status}
            onChange={(e) =>
              dispatch(setFilters({ ...filters, status: e.target.value }))
            }
            className="select"
          >
            <option value="">All statuses</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading colleges...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Contact Person</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Follow-Up Date</th>
                  <th>Assigned To</th>
                  <th>Logs</th>
                </tr>
              </thead>
              <tbody>
                {colleges.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="no-data">
                      No colleges found.
                    </td>
                  </tr>
                ) : (
                  colleges.map((college) => (
                    <tr key={college._id}>
                      <td>{college.name}</td>
                      <td>{college.location || "-"}</td>
                      <td>{college.contactPerson || "-"}</td>

                      <td>
                        <select
                          value={college.status}
                          onChange={(e) =>
                            updateCollegeField(
                              college._id,
                              "status",
                              e.target.value
                            )
                          }
                          className="select"
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <EditableText
                          text={college.notes || ""}
                          onSave={(val) =>
                            updateCollegeField(college._id, "notes", val)
                          }
                        />
                      </td>

                      <td>
                        <EditableDate
                          date={college.followUpDate}
                          onSave={(val) =>
                            updateCollegeField(college._id, "followUpDate", val)
                          }
                        />
                      </td>

                      <td>
                        <select
                          value={college.assignedTo?._id || ""}
                          onChange={(e) =>
                            updateCollegeField(
                              college._id,
                              "assignedTo",
                              e.target.value
                            )
                          }
                          className="select"
                        >
                          <option value="">Unassigned</option>
                          {users.map((u) => (
                            <option key={u._id} value={u._id}>
                              {u.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => fetchLogsHandler(college._id)}
                          className="btn-secondary"
                        >
                          View Logs
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {showLogsFor && (
              <div className="modal-backdrop">
                <div className="modal">
                  <h3>Activity Logs</h3>
                  <button
                    onClick={() => setShowLogsFor(null)}
                    className="btn-close"
                    aria-label="Close logs modal"
                  >
                    &times;
                  </button>

                  {logsLoading ? (
                    <p>Loading...</p>
                  ) : activityLogs.length === 0 ? (
                    <p>No logs found.</p>
                  ) : (
                    <ul className="logs-list">
                      {activityLogs.map((log) => (
                        <li key={log._id}>
                          <strong>{log.changeType}</strong>
                          <br />
                          <small>
                            <b>By:</b> {log.changedBy?.name || "Unknown"} —{" "}
                            <b>On:</b>{" "}
                            {new Date(log.createdAt).toLocaleString()}
                          </small>
                          <div>
                            <b>Old:</b> {String(log.oldValue)}
                            <br />
                            <b>New:</b> {String(log.newValue)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                disabled={page <= 1}
                onClick={() => dispatch(setPage(page - 1))}
                className="btn-secondary"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => dispatch(setPage(page + 1))}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

// Editable Text Cell component
const EditableText = ({ text, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  const save = () => {
    setEditing(false);
    if (value !== text) {
      onSave(value);
    }
  };

  return editing ? (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      autoFocus
      rows={3}
      className="editable-textarea"
    />
  ) : (
    <div
      onClick={() => setEditing(true)}
      className="editable-text"
      role="button"
      tabIndex={0}
      onKeyPress={() => setEditing(true)}
    >
      {text || <i className="placeholder-text">Click to add notes</i>}
    </div>
  );
};

// Editable Date Cell component
const EditableDate = ({ date, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(
    date ? new Date(date).toISOString().split("T")[0] : ""
  );

  const save = () => {
    setEditing(false);
    if (value !== (date ? new Date(date).toISOString().split("T")[0] : "")) {
      onSave(value ? new Date(value) : null);
    }
  };

  return editing ? (
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      autoFocus
      className="editable-input-date"
    />
  ) : (
    <div
      onClick={() => setEditing(true)}
      className="editable-text"
      role="button"
      tabIndex={0}
      onKeyPress={() => setEditing(true)}
    >
      {date ? (
        new Date(date).toLocaleDateString()
      ) : (
        <i className="placeholder-text">Add date</i>
      )}
    </div>
  );
};

export default CollegeOutreachDashboard;
