import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "../JobAdmin.css";
import "./AddHR.css";
import {
  FaBuilding,
  FaEnvelope,
  FaLink,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { addNewHR, editHR, fetchAllHRs } from "../../../app/slices/hrSlice";
import { useDispatch, useSelector } from "react-redux";

const defaultHR = {
  name: "",
  email: "",
  password: "",
  company: "",
  phoneNumber: "",
  role: "hr",
  companyWebsite: "",
  companyLogoUrl: "",
};

const HRForm = ({ editingHR, setEditingHR }) => {
  const [formData, setFormData] = useState(defaultHR);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.hr);


  useEffect(() => {
    if (editingHR) {
      setFormData(editingHR);
    } else {
      setFormData(defaultHR);
    }
  }, [editingHR]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingHR) {
      await dispatch(editHR(formData)).unwrap();
      toast.success("HR updated successfully!");
    } else {
      await dispatch(addNewHR(formData)).unwrap();
      toast.success("HR added successfully!");
    }

    dispatch(fetchAllHRs());
    setFormData(defaultHR);
    setEditingHR(null);
  } catch (err) {
    toast.error(err?.message || "❌ Failed to save HR");
  }
};

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{editingHR ? "Edit HR" : "Add New HR"}</h2>

      <div className="input-group">
        <label>
          <FaUser />
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          // autoFocus
        />
      </div>

      <div className="input-group">
        <label>
          <FaEnvelope />
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
      </div>

      <div className="input-group">
        <label>
          <FaPhone />
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          required
        />
      </div>
      <div className="input-group">
        <label>
          {" "}
          <FaBuilding /> Company{" "}
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
      </div>
      <div className="input-group">
        <label>
          <FaLink />
          Company Website URL
        </label>
        <input
          type="url"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          placeholder="Company Website URL"
          required
        />
      </div>
      <div className="input-group">
        <label>Company Logo URL</label>
        <input
          type="text"
          name="companyLogoUrl"
          value={formData.companyLogoUrl}
          onChange={handleChange}
          placeholder="company Logo URL (Optional)"
        />
      </div>
      {!editingHR && (
        <div className="input-group">
          <label>
            <RiLockPasswordLine /> Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      )}
      <div style={{ gridColumn: "span 2" }}>
        {/* Cancel button */}
        <button
          type="button"
          className="btn cancel"
          onClick={() => {
            setFormData(defaultHR);
            setEditingHR(null);
            toast.info("Form cleared");
          }}
        >
          <FaTimes style={{ marginRight: "5px" }} />
          {editingHR ? "Cancel" : "Reset"}
        </button>
        <button type="submit" className="btn primary">
          {isLoading ? (
            <ClipLoader size={20} color="#fff" />
          ) : editingHR ? (
            "Update HR"
          ) : (
            "Add HR"
          )}
        </button>
      </div>
    </form>
  );
};

export default HRForm;
