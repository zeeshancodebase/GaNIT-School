import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCandidate } from "../../app/slices/candidateSlice";
import "./CandidateForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobByJobIdAsync } from "../../app/slices/jobSlice";
import {
  FaArrowRight,
  // FaMapMarkerAlt,
  // FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import FullPageSpinner from "../../components/FullPageSpinner/FullPageSpinner";

const CandidateForm = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    dob: "",
    gender: "",
    degree: "",
    branch: "",
    college: "",
    university: "",
    yearOfPassout: "",
    skills: [],
    occupation: "",
    currentSalary: "",
    preferredCourse: "",
    linkedIn: "",
    source: "",
    referralCode: "",
    appliedFor: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const {
    selectedJob: job,
    isLoading: isJobLoading,
    error,
  } = useSelector((state) => state.jobs);

  const selectedJobId = useSelector((state) => state.jobs.selectedJob?.jobId);

  const { isLoading: isSubmitting } = useSelector((state) => state.candidate);

  useEffect(() => {
    if (!selectedJobId || String(selectedJobId) !== String(jobId)) {
      dispatch(fetchJobByJobIdAsync(jobId));
    }
  }, [dispatch, jobId, selectedJobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For skills input field, ignore direct typing - we handle skills separately
    if (name === "skills") return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add skill handler
  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
    }
    setSkillInput("");
  };

  // Remove skill handler
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };
  useEffect(() => {
    if (job && job.jobId) {
      setFormData((prev) => ({
        ...prev,
        appliedFor: job.jobId,
      }));
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addNewCandidate(formData)).unwrap();
      toast.success("Redirecting please wait...");
      if (job?.appLink) {
        window.location.href = job.appLink;
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      toast.error(err.message || "Submission failed. Try again.");
    }
  };
  if (isJobLoading) return <FullPageSpinner />;
  if (error) return <p>Error loading job details: {error}</p>;
  if (!job)
    return (
      <p style={{ margin: "10%", padding: "60px", border: "2px solid red" }}>
        Job not found.
      </p>
    );

  return (
    <form onSubmit={handleSubmit} className="candidate-form">
      <h2>Apply for {job.title}</h2>
      {/* <p>{job.jobDesc}</p>
      <div>
        <FaMapMarkerAlt />
        {job.company}
        <FaMoneyBillWave />
        {job.location}
      </div> */}
      <div className="form-grid-wrapper">
        {/* ───── Personal Information ───── */}
        <div className="input-group">
          <label>Your Good Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            pattern="\d{10}"
            maxLength={10}
            inputMode="numeric"
            title="Enter a 10-digit mobile number"
          />
        </div>

        {/* <div className="input-group">
          <label>Date of Birth (Enter/Select)</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* <div className="input-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div> */}

        <div className="input-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Your City"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* ───── Educational Information ───── */}
        <div className="input-group">
          <label>Degree</label>
          <input
            type="text"
            name="degree"
            placeholder="e.g. B.E/B.Tech/BCA etc."
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            placeholder="Branch (e.g., CSE, ECE)"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>College</label>
          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>University</label>
          <input
            type="text"
            name="university"
            placeholder="University Name"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Year of Passout</label>
          <select
            name="yearOfPassout"
            value={formData.yearOfPassout}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 10 }, (_, i) => 2021 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* ───── Professional Information ───── */}
        <div className="input-group">
          <label>Currently You Are:</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Job-Hunting">Job-Hunting</option>
            <option value="Working">Working</option>
          </select>
        </div>
        {formData.occupation === "Working" && (
          <div className="input-group">
            <label>Current Salary (in LPA)</label>
            <input
              type="number"
              name="currentSalary"
              placeholder="e.g. 6.5"
              value={formData.currentSalary}
              onChange={handleChange}
            />
          </div>
        )}

        {/* <div className="input-group">
          <label>Preferred Course</label>
          <input
            type="text"
            name="preferredCourse"
            placeholder="Preferred Course"
            value={formData.preferredCourse}
            onChange={handleChange}
          />
        </div> */}

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
            {formData.skills.map((skill, index) => (
              <span key={index} className="job-skill-tag">
                {skill}
                <span
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove skill ${skill}`}
                >
                  <FaTimes />
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ───── External Profile Link ───── */}
        {formData.occupation === "Working" && (
          <div className="input-group">
            <label>LinkedIn / Portfolio (if any) </label>
            <input
              type="url"
              name="linkedIn"
              placeholder="LinkedIn / Portfolio URL"
              value={formData.linkedIn}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="source">How did you hear about us?</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Instagram">Instagram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Campaign">Campaign</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {formData.source === "Referral" && (
          <div className="input-group">
            <label htmlFor="referralCode">Referral Code</label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter referral code"
            />
          </div>
        )}
      </div>
      <div style={{ gridColumn: "span 2" }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Redirecting..." : " Save & Proceed"}{" "}
          <FaArrowRight style={{ marginLeft: "5px" }} />
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
