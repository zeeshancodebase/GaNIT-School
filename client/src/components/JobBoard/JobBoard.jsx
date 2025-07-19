import React from 'react';

import {
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { FaMapMarkerAlt} from "react-icons/fa";
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

const jobList = [
  {
    title: "Full Stack Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    salary: "₹8-12L",
    isNew: true,
  },
  {
    title: "Python Developer",
    company: "DataViz Analytics",
    location: "Bangalore",
    salary: "₹5-9L",
    isNew: true,
  },
  {
    title: "Frontend Developer",
    company: "UX Innovations",
    location: "Hybrid",
    salary: "₹6-10L",
    isNew: false,
  },
];

const JobBoard = () => {
  return (<>
     {/*Job Board*/}
          <section id="job-board" className="job-board">
            <div className="container job-board-wrapper">
              {/* Left Panel */}
              <div className="job-board-left">
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
    
                <div className="job-actions">
                  <a href="/" className="btn primary">
                    Apply Now
                  </a>
                  <a href="/" className="btn secondary">
                    Resume Review
                  </a>
                  <a href="/" className="btn secondary">
                    Book Mock Interview
                  </a>
                </div>
              </div>
    
              {/* Right Panel */}
              <div className="job-board-right">
                <div className="job-card-wrapper">
                  <div className="job-card-header">
                    <h3>Latest Openings</h3>
                    <a href="/job-board" className="job-view-all">
                      View All
                    </a>
                  </div>
                  <div className="job-list">
                    {jobList.map((job, index) => (
                      <div key={index} className="job-card">
                        <div className="job-card-top">
                          <div>
                            <h4>{job.title}</h4>
                            <p className="job-company">{job.company}</p>
                          </div>
                          {job.isNew && <span className="job-new">New</span>}
                        </div>
                        <div className="job-card-bottom">
                          <span className="job-info">
                            <FaMapMarkerAlt className="job-icon" />
                            {job.location}
                          </span>
                          <span className="job-info">
                            <FaMoneyBillWave className="job-icon" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  );
};

export default JobBoard;
