import React, { useState } from "react";
import JobForm from "./JobForm";
import JobList from "./JobList";
import { useAuth } from "../../context/auth";
import { FaBriefcase, FaClock, FaMoneyBillWave } from "react-icons/fa";
const jobStats = [
  {
    icon: <FaBriefcase className="w-5 h-5 text-neonGreen mr-2" />,
    label: "45 New Jobs",
  },
  {
    icon: <FaClock className="w-5 h-5 text-neonGreen mr-2" />,
    label: "Last Updated: Today",
  },
  {
    icon: <FaMoneyBillWave className="w-5 h-5 text-neonGreen mr-2" />,
    label: "Avg. Salary: ₹6.5L",
  },
];

const JobPage = () => {
  const [editingJob, setEditingJob] = useState(null);
  const {  isLoggedIn } = useAuth();
  return (
    <div className="admin-dashboard container">
      <div className="admin-panel-title">
        <h2>Job Portal</h2>
      </div>
      {isLoggedIn ? (
        <JobForm editingJob={editingJob} setEditingJob={setEditingJob} />
      ) : (
        <div className="container job-board-wrapper">
          <div className="job-board-left" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h2 className="job-board-title">Live Job Board</h2>
            <p className="job-board-subtitle">
              100+ Companies Hiring GaNIT School Graduates
            </p>

            <div className="job-stats">
              {jobStats.map((stat, index) => (
                <div key={index} className="job-stat">
                  <span className="highlight">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* <div className="job-actions">
              <a href="/" className="btn primary">
                Apply Now
              </a>
              <a href="/" className="btn secondary">
                Resume Review
              </a>
              <a href="/" className="btn secondary">
                Book Mock Interview
              </a>
            </div> */}
          </div>
        </div>
      )}
      <JobList setEditingJob={setEditingJob} />
    </div>
  );
};

export default JobPage;
