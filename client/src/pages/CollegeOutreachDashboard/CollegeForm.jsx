import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import {
  addCollegeThunk,
  updateCollegeGeneralThunk,
} from "../../app/slices/collegeSlice"; // Assuming you have this thunk
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CollegeForm = ({
  onClose,
  initialData = {},
  editMode = false,
  collegeId = "",
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { users } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.colleges);

  const isLoading = editMode ? loading.updateGeneral : loading.add;

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    assignedTo: "",
    ...initialData, // prefill if editing
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("User not authenticated");

    try {
      if (editMode) {
        // Dispatch update thunk
        await dispatch(
          updateCollegeGeneralThunk({
            token,
            id: collegeId,
            updateData: formData,
          })
        ).unwrap();
        toast.success("College updated successfully");
      } else {
        await dispatch(
          addCollegeThunk({ token, collegeData: formData })
        ).unwrap();
        toast.success("College added successfully");
      }

      if (onSuccess) onSuccess(); // optional callback
      onClose();
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="clg-form">
      <input
        required
        name="name"
        placeholder="College Name"
        value={formData.name}
        onChange={handleInputChange}
        className="clg-input"
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleInputChange}
        className="clg-input"
      />
      <input
        name="contactPerson"
        placeholder="Contact Person"
        value={formData.contactPerson}
        onChange={handleInputChange}
        className="clg-input"
      />
      <input
        name="contactEmail"
        type="email"
        placeholder="Contact Email"
        value={formData.contactEmail}
        onChange={handleInputChange}
        className="clg-input"
      />
      <input
        name="contactPhone"
        placeholder="Contact Phone"
        value={formData.contactPhone}
        onChange={handleInputChange}
        className="clg-input"
      />

      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleInputChange}
        className="clg-select"
      >
        <option value="">Assign to (optional)</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button type="button" className="btn-with-icon btn-secondary" onClick={onClose}>
          <FaTimes /> Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <ClipLoader size={16} color="#fff" />
              <span style={{ marginLeft: "8px" }}>
                {editMode ? "Updating..." : "Adding..."}
              </span>
            </>
          ) : editMode ? (
            "Update College"
          ) : (
            "Add College"
          )}
        </button>
      </div>
    </form>
  );
};

export default CollegeForm;
