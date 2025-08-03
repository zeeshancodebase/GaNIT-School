import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createJobAsync,
  fetchJobsAsync,
  updateJobAsync,
} from "../../../app/slices/jobSlice";
import "../JobAdmin.css";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const defaultJob = {
  title: "",
  company: "",
  location: "",
  salary: "",
  appLink: "",
  jobDesc: "",
  isInternal: "",
  skills: [],
};

const JobForm = ({ editingJob, setEditingJob }) => {
  const [job, setJob] = useState(defaultJob);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.jobs);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (editingJob) {
      setJob(editingJob);
    } else {
      setJob(defaultJob);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the company field is being updated
    if (name === "company") {
      const isGanit = value.trim().toLowerCase().includes("ganit");

      setJob((prev) => ({
        ...prev,
        [name]: value,
        isInternal: isGanit, // true if it matches
      }));
    } else {
      setJob((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !job.skills.includes(trimmed)) {
      setJob((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setSkillInput(""); // Clear input after adding
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await dispatch(updateJobAsync(job));
        toast.success("Job updated successfully!");
      } else {
        await dispatch(createJobAsync(job));
        toast.success("Job created successfully!");
      }
      setJob(defaultJob);
      setEditingJob(null);
      dispatch(fetchJobsAsync());
    } catch (err) {
      console.error("Failed to save job:", err);
      toast.error("Something went wrong. Please try again.");
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
      {/* <div className="input-group">
        <label>Is Internal?</label>
        <input
          type="checkbox"
          checked={job.isInternal}
          readOnly
          title="This is determined automatically based on the company name"
        />
      </div> */}

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
      <div className="input-group" style={{ gridColumn: "span 2" }}>
        <label>Application link</label>
        <input
          type="text"
          name="appLink"
          placeholder="Enter application link (e.g. https://forms.gle/..., company website)"
          value={job.appLink}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label>Skills</label>
        <input
          type="text"
          placeholder="Type a skill and press Enter"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addSkill();
            }
          }}
          onBlur={addSkill}
        />
      </div>
      <div className="input-group">
        <div className="skills-list">
          {job.skills.map((skill, index) => (
            <span key={index} className="job-skill-tag">
              {skill}
              <button
                type="button"
                onClick={() =>
                  setJob((prev) => ({
                    ...prev,
                    skills: prev.skills.filter((s, i) => i !== index),
                  }))
                }
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="input-group" style={{ gridColumn: "span 2" }}>
        <label>Job Summary</label>
        <textarea
          name="jobDesc"
          placeholder="Write a short job summary (max 250 characters)"
          value={job.jobDesc}
          onChange={handleChange}
          maxLength={250}
          required
        />
        <small>{250 - (job.jobDesc?.length || 0)} characters remaining</small>
      </div>

      <div style={{ gridColumn: "span 2" }}>
        {/* Cancel button */}
        <button
          type="button"
          className="btn cancel"
          onClick={() => {
            setJob(defaultJob); // reset inputs
            if (editingJob) {
              setEditingJob(null); // exit edit mode if editing
              toast.info("Edit cancelled");
            }
          }}
        >
          <FaTimes style={{ marginRight: "5px" }} />
          {editingJob ? "Cancel" : "Reset"}
        </button>
        <button type="submit" className="btn primary">
          {isLoading ? (
            <ClipLoader size={20} color="#fff" />
          ) : editingJob ? (
            "Update Job"
          ) : (
            "Add Job"
          )}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
