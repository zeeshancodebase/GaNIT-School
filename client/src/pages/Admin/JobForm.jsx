import React, { useState, useEffect } from "react";
import { createJob, updateJob } from "../../services/jobService";
import "./JobAdmin.css";
import { ClipLoader } from "react-spinners";



const defaultJob = {
  title: "",
  company: "",
  location: "",
  salary: "",
  isNew: false,
};

const JobForm = ({ editingJob, setEditingJob }) => {
  const [job, setJob] = useState(defaultJob);
const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    if (editingJob) {
      setJob(editingJob);
    } else {
      setJob(defaultJob);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingJob) {
        await updateJob(job);
      } else {
        await createJob(job);
      }
      setJob(defaultJob);
      setEditingJob(null);
    } catch (err) {
      console.error("Failed to save job:", err);
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    
      <form className="add-job-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{editingJob ? "Edit Job" : "Add New Job"}</h2>

        <div className="input-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter job title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={job.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter job location"
            value={job.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            placeholder="Enter salary (e.g. ₹6-10L)"
            value={job.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isNew"
              checked={job.isNew}
              onChange={handleChange}
            />{" "}
            Mark as New
          </label>
        </div>
<div>
        <button type="submit" className="btn primary">
          {isLoading ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            editingJob ? "Update Job" : "Add Job"
          )}
        </button></div>
      </form>
    
  );
};

export default JobForm;
