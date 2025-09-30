import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsAsync,
  deleteJobAsync,
  closeJobAsync,
  reopenJobAsync,
} from "../../../app/slices/jobSlice";
import "../JobAdmin.css";
import {
  FaArrowRight,
  FaBuilding,
  FaEdit,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

const JobList = ({
  setEditingJob,
  limit,
  showViewAll = false,
  showActionBtn = true,
}) => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { isLoggedIn } = useAuth();

  const [deletingId, setDeletingId] = useState(null);

  // useEffect(() => {
  //   const loadJobs = async () => {
  //     const data = await fetchJobs();
  //     setJobs(data);
  //   };
  //   loadJobs();
  // }, []);

  useEffect(() => {
    dispatch(fetchJobsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setDeletingId(id); // Show spinner on this card
          await dispatch(deleteJobAsync(id));
          await dispatch(fetchJobsAsync());
          toast.success("Job deleted successfully!");
        } catch (err) {
          toast.error("Failed to delete job.");
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  const handleCloseJob = (jobId) => {
    Swal.fire({
      title: "Close this job?",
      text: "This job will be marked as closed and no longer visible to applicants.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, close it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(closeJobAsync(jobId)).unwrap();
          await dispatch(fetchJobsAsync());
          toast.success("Job closed successfully!");
        } catch (err) {
          toast.error("Failed to close job");
        }
      }
    });
  };

  const handleReopenJob = (jobId) => {
    Swal.fire({
      title: "Reopen this job?",
      text: "This job will be marked as open and visible to applicants again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reopen it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(reopenJobAsync(jobId)).unwrap();
          await dispatch(fetchJobsAsync());
          toast.success("Job reopened successfully!");
        } catch (err) {
          toast.error("Failed to reopen job");
        }
      }
    });
  };

  // Show limited jobs if limit is passed
  const visibleJobs = limit ? jobs.slice(0, limit) : jobs;

  return (
    <>
      <div className="job-board-right admin-view">
        <div className="job-card-header">
          {isLoggedIn ? (
            <h3 className="job-list-title">
              Manage Job Listings{" "}
              <Link to="/super-admin/jobs" class="job-view-all">
                View All <FaArrowRight />
              </Link>
            </h3>
          ) : (
            <h3 className="job-list-title">Available Vacancies</h3>
          )}
        </div>
        <div className="job-list-wrapper">
          {isLoading ? (
            <p>Loading jobs...</p>
          ) : (
            visibleJobs.map((job) => (
              <div
                key={job._id}
                className="job-card job-card-admin"
                style={{ paddingTop: "5px" }}
              >
                <span className="job-id">Job ID: {job.jobId} </span>
                <div className="job-card-top">
                  <div>
                    <h4 className="job-title">{job.title}</h4>
                    <p className="job-company">
                      <FaBuilding size={18} style={{ paddingRight: "5px" }} />
                      {job.company}
                    </p>
                  </div>
                  {/* {job.isNew && <span className="job-new">New</span>}
                  {job.status === "closed" && (
                    <span className="badge closed">Closed</span>
                  )} */}
                  {job.status === "closed" ? (
                    <span className="badge closed">Closed</span>
                  ) : job.isNew ? (
                    <span className="job-new">New</span>
                  ) : null}
                </div>
                <div>
                  <p className="job-summary">
                    {job.jobDesc ||
                      "Join our team and help us build cutting-edge solutions."}
                  </p>
                  {job.skills && job.skills.length > 0 && (
                    <div className="job-skills">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="job-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="loc-sal">
                  <span className="job-info">
                    <FaMapMarkerAlt className="job-icon" />
                    {job.location}
                  </span>
                  <span className="job-info">
                    <FaMoneyBillWave className="job-icon" />
                    {job.salary || "-"}
                  </span>
                </div>{" "}
                <div className="job-admin-actions">
                  {showActionBtn && isLoggedIn ? (
                    <div>
                      <button
                        className="btn-edit"
                        onClick={() => setEditingJob(job)}
                      >
                        <FaEdit /> Edit{" "}
                      </button>{" "}
                      {job.status === "closed" ? (
                        <button
                          className="btn-edit"
                          onClick={() => handleReopenJob(job._id)}
                        >
                          Reopen
                        </button>
                      ) : (
                        <button
                          className="btn-edit"
                          onClick={() => handleCloseJob(job._id)}
                        >
                          Close
                        </button>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(job._id)}
                        disabled={deletingId === job._id}
                        // disabled
                        // style={{ cursor: "not-allowed", opacity: 0.5 }}
                      >
                        {deletingId === job._id ? (
                          <ClipLoader size={14} color="#fff" />
                        ) : (
                          <>
                            <FaTrash /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    // <Link to={job.appLink} className="btn apply-btn">
                    //   Apply Now <FaPaperPlane style={{ marginLeft: "5px" }} />{" "}
                    // </Link>
                    <Link
                      to={`/jobs/apply-now/${job.jobId}`}
                      className="btn apply-btn"
                    >
                      Apply Now <FaPaperPlane style={{ marginLeft: "5px" }} />{" "}
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
          {showViewAll && (
            <Link to="/super-admin/jobs" className="admin-view-all-btn">
              Job Portal
              <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default JobList;
