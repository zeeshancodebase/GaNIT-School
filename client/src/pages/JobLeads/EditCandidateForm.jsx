// EditCandidateForm.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCandidateGeneralThunk } from "../../app/slices/candidateSlice"; // adjust import
import { useAuth } from "../../context/auth";

const EditCandidateForm = ({
  openEditCandidateModal,
  formData,
  setFormData,
  onClose,
}) => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateCandidateGeneralThunk({
          token,
          id: formData._id,
          updateData: {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            preferredCourse: formData.preferredCourse,
          },
        })
      ).unwrap();

      toast.success("Candidate updated successfully.");
      onClose(); // Close modal
    } catch (err) {
      toast.error("Failed to update candidate.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="clg-form">
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          className="clg-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Mobile:{" "}
        <input
          type="text"
          name="mobile"
          className="clg-input"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:{" "}
        <input
          type="email"
          name="email"
          className="clg-input"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
       Interested Course:{" "}
        <input
          type="text"
          name="preferredCourse"
          className="clg-input"
          value={formData.preferredCourse}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="btn-primary">
        Update Candidate
      </button>
    </form>
  );
};

export default EditCandidateForm;
