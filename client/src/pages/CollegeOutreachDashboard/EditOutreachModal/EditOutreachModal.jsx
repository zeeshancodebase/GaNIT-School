// components/CollegeOutreach/EditOutreachModal.jsx
import React from "react";
import "./EditOutreachModal.css";
import { ClipLoader } from "react-spinners";

const EditOutreachModal = ({
  outreachFormData,
  handleChange,
  handleSubmit,
  loading,
}) => {
  const statusConfig = {
    "Not Contacted": {
      notes: false,
      followUpDate: false,
      followUpRequired: false,
    },
    Contacted: { notes: true, followUpDate: true, followUpRequired: false },
    "Follow-Up": { notes: true, followUpDate: true, followUpRequired: true },
    "Meeting Scheduled": {
      notes: true,
      followUpDate: true,
      followUpRequired: false,
    },
    "Not Interested": {
      notes: true,
      followUpDate: false,
      followUpRequired: false,
    },
    "Signed Up": { notes: true, followUpDate: false, followUpRequired: false },
  };
  const currentConfig = statusConfig[outreachFormData.status] || {
    notes: false,
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

        {currentConfig.notes && (
          <label>
            Notes:
            <textarea
              name="notes"
              value={outreachFormData.notes}
              onChange={handleChange}
              rows={4}
            />
          </label>
        )}

        {currentConfig.followUpDate && (
          <label>
            Follow-Up Date:
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

export default EditOutreachModal;
