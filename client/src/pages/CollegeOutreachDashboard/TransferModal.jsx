import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const TransferModal = ({ users, currentAssignedToId, onTransfer, loading, entityType }) => {
  const [selectedUserId, setSelectedUserId] = useState(
    currentAssignedToId || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId || loading) return;
    onTransfer(selectedUserId);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>Select User:</label> */}
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        required
        className="clg-select"
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} 
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button
          type="submit"
          className="btn-with-icon btn-primary"
          disabled={loading} // disable button while loading
        >
          {loading ? (
            <>
              <ClipLoader size={18} color="white" />
              Transferring... 
            </>
          ) : (
            <>
              Transfer <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TransferModal;
