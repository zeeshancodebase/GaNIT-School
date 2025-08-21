
import React from "react";
import { ClipLoader } from "react-spinners";

const UpdateOutreachModal = ({
  outreachFormData,
  handleChange,
  handleSubmit,
  loading,
}) => {
const statusConfig = {
  New: {
    note: false,
    followUpDate: false,
    followUpRequired: false,
  },
  Contacted: {
    note: true,
    followUpDate: true,
    followUpRequired: false,
  },
  Interested: {
    note: true,
    followUpDate: true,
    followUpRequired: true,
  },
  "Follow-Up": {
    note: true,
    followUpDate: true,
    followUpRequired: true,
  },
  "Meeting Scheduled": {
    note: true,
    followUpDate: true,
    followUpRequired: true,
    followUpLabel: "Meeting Date",
  },
  Enrolled: {
    note: true,
    followUpDate: false,
    followUpRequired: false,
  },
  "Not Interested": {
    note: true,
    followUpDate: false,
    followUpRequired: false,
  },
  Rejected: {
    note: true,
    followUpDate: false,
    followUpRequired: false,
  },
};

  const currentConfig = statusConfig[outreachFormData.status] || {
    note: false,
    followUpDate: false,
    followUpRequired: false,
  };

  return (
    <div className="edit-outreach-modal">
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select
            name="status"
            value={outreachFormData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            {Object.keys(statusConfig).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        {currentConfig.note && (
          <label>
            Note:
            <textarea
              name="note"
              value={outreachFormData.note}
              onChange={handleChange}
              rows={4}
            />
          </label>
        )}

        {currentConfig.followUpDate && (
          <label>
           {currentConfig.followUpLabel || "Follow-Up Date"}:
            <input
              type="date"
              name="followUpDate"
              value={outreachFormData.followUpDate}
              onChange={handleChange}
              required={currentConfig.followUpRequired}
            />
          </label>
        )}

        <div className="modal-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <ClipLoader size={16} color="#fff" />
                <span style={{ marginLeft: 8 }}>Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOutreachModal;
