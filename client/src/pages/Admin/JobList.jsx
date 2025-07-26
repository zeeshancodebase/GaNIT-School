import React, { useEffect, useState } from "react";
import { deleteJob, fetchJobs } from "../../services/jobService";
import "./JobAdmin.css";
import {
  FaArrowRight,
  FaEdit,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const JobList = ({
  setEditingJob,
  limit,
  showViewAll = false,
  showActionBtn = true,
}) => {
  const [jobs, setJobs] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    await deleteJob(id);
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Show limited jobs if limit is passed
  const visibleJobs = limit ? jobs.slice(0, limit) : jobs;

  return (
    <>
      <div className="job-board-right admin-view">
        <div className="job-card-header">
          <h3 className="job-list-title">Manage Job Listings</h3>
        </div>
        <div className="job-list-wrapper">
          {visibleJobs.map((job) => (
            <div key={job.id} className="job-card job-card-admin">
              <div className="job-card-top">
                <div>
                  <h4>{job.title}</h4>
                  <p className="job-company">{job.company}</p>
                </div>
                {job.isNew && <span className="job-new">New</span>}
              </div>
              <div className="job-card-bottom">
                <div style={{display:"flex", gap:"20px"}}>
                  <span className="job-info">
                    <FaMapMarkerAlt className="job-icon" />
                    {job.location}
                  </span>
                  <span className="job-info">
                    <FaMoneyBillWave className="job-icon" />
                    {job.salary}
                  </span>
                </div>
                <div>
                  {showActionBtn && isLoggedIn ? (
                    <div className="job-admin-actions">
                      <button
                        className="btn-edit"
                        onClick={() => setEditingJob(job)}
                      >
                        <FaEdit /> Edit{" "}
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(job.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  ) : (
                    <Link to={job.appLink} class="btn primary">Apply Now <FaPaperPlane style={{marginLeft:"10px"}}/> </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
          {showViewAll && (
            <Link to="/super-admin/jobs" className="admin-view-all-btn">
              View All
              <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default JobList;
