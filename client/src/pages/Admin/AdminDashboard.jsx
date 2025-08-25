import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "./Jobs/JobList";
import HRList from "./HRManagement/HRList";
// Placeholder imports for future components
// import LeadsList from "./Leads/LeadsList";
// import CollegeList from "./CollegeOutreach/CollegeList";

import "./AdminDashboard.css";
import { useAuth } from "../../context/auth";
import { FaPlus } from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import CollegeForm from "../CollegeOutreachDashboard/CollegeForm";
import Layout from "../../Layout/Layout";
import ActivityLogList from "./other/ActivityLogList";

// Icons using font-awesome class names for demo (you can replace with react-icons or images)
const Icon = ({ name }) => (
  <i className={`fas fa-${name}`} aria-hidden="true"></i>
);

const SummaryCard = ({ title, count, iconName, onClick }) => (
  <div
    className="summary-card"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
    aria-label={`${title} summary, click to manage`}
  >
    <div className="summary-icon">
      <Icon name={iconName} />
    </div>
    <div className="summary-info">
      <h3>{count}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const NotificationBell = ({ notifications }) => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const toggleOpen = () => setOpen((o) => !o);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-bell" ref={bellRef}>
      <button
        className="bell-btn"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Notifications"
      >
        <Icon name="bell" />
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </button>
      {open && (
        <div
          className="notification-dropdown"
          role="menu"
          aria-label="Notifications list"
        >
          {notifications.length === 0 && (
            <p className="no-notifications">No notifications</p>
          )}
          <ul>
            {notifications.map((note, idx) => (
              <li key={idx} className={note.unread ? "unread" : ""}>
                <strong>{note.title}</strong>
                <p>{note.message}</p>
                <small>{note.time}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAddCollegeForm, setShowAddCollegeForm] = useState(false);

  // Dummy data - replace with API calls or redux selectors
  const totalJobs = 42;
  const totalHRs = 15;
  const totalLeads = 80;
  const totalColleges = 25;
  const totalUsers = 1500;
  const totalAdmins = 3;
  const totalCandidates = 1000;

  const notifications = [
    {
      title: "New Job Posted",
      message: "Frontend Developer job posted",
      time: "2h ago",
      unread: true,
    },
    {
      title: "Lead Assigned",
      message: "New lead assigned to HR team",
      time: "1d ago",
      unread: false,
    },
    {
      title: "System Update",
      message: "Scheduled maintenance on Saturday",
      time: "3d ago",
      unread: false,
    },
  ];

  // Navigation handlers
  const goToJobs = () => navigate("/super-admin/jobs");
  const goToHRs = () => navigate("/super-admin/HRManagement");
  const goToLeads = () => navigate("/super-admin/Leads");
  const goToColleges = () => navigate("/college-outreach");
  const goToUsers = () => navigate("/super-admin/users");

  useEffect(() => {
    document.title = "Admin Dashboard | GaNIT School";
  }, []);

  return (
    <Layout>
      <div
      // className="clg-container"
      >
        <main className="admin-dashboard ">
          <header className="dashboard-header">
            <h1 className="admin-panel-title">Welcome back, {user.name}!</h1>
            <div className="header-actions">
              <NotificationBell notifications={notifications} />
              <button
                className="btn-with-icon btn-primary"
                onClick={() => navigate("/super-admin/jobs")}
              >
                <FaPlus /> Add New Job
              </button>
              <button
                className="btn-with-icon btn-primary"
                onClick={() => navigate("/super-admin/HRManagement")}
              >
                <FaPlus /> Add New HR
              </button>
              <button
                className="btn-with-icon btn-primary"
                onClick={() => setShowAddCollegeForm(true)}
              >
                <FaPlus /> Add College
              </button>
            </div>
          </header>
          <hr className="admin-title-divider" />

          <section className="dashboard-summary">
            <SummaryCard
              title="Total Jobs"
              count={totalJobs}
              iconName="briefcase"
              onClick={goToJobs}
            />
            <SummaryCard
              title="HR Users"
              count={totalHRs}
              iconName="user-tie"
              onClick={goToHRs}
            />
            <SummaryCard
              title="Student Leads"
              count={totalLeads}
              iconName="users"
              onClick={goToLeads}
            />
            <SummaryCard
              title="Colleges"
              count={totalColleges}
              iconName="building"
              onClick={goToColleges}
            />
            <SummaryCard
              title="Total Users"
              count={totalUsers}
              iconName="user"
              onClick={goToUsers}
            />
            <SummaryCard
              title="Admins"
              count={totalAdmins}
              iconName="user-shield"
              onClick={goToUsers}
            />
            <SummaryCard
              title="Candidates"
              count={totalCandidates}
              iconName="user-graduate"
              onClick={goToUsers}
            />
          </section>

          <section className="dashboard-section recent-jobs">
            <div className="section-header">
              <h2>Recent Job Postings</h2>
              <button onClick={goToJobs} className="btn secondary">
                View All Jobs
              </button>
            </div>
            <JobList limit={5} showViewAll={false} showActionBtn={true} />
          </section>

          <section className="dashboard-section recent-hrs">
            <div className="section-header">
              <h2>Recent HR Users</h2>
              <button onClick={goToHRs} className="btn secondary">
                Manage HRs
              </button>
            </div>
            <HRList limit={5} showViewAll={false} showActionBtn={true} />
          </section>

          <section className="dashboard-section recent-leads">
            <div className="section-header">
              <h2>Recent Student Leads</h2>
              <button onClick={goToLeads} className="btn secondary">
                Manage Leads
              </button>
            </div>
            {/* TODO: Replace with actual LeadsList component */}
            <div className="placeholder-list">Leads list will appear here</div>
          </section>

          <section className="dashboard-section college-outreach">
            <div className="section-header">
              <h2>College Outreach Summary</h2>
              <button onClick={goToColleges} className="btn secondary">
                Manage Colleges
              </button>
            </div>
            {/* TODO: Replace with actual CollegeList or summary */}
            <div className="placeholder-list">
              College outreach data will appear here
            </div>
          </section>

          <section className="dashboard-section system-activity">
            <div className="section-header">
              <h2>Recent System Activity</h2>
              <button
                onClick={() => navigate("/super-admin/activity")}
                className="btn secondary"
              >
                View Full Activity Log
              </button>
            </div>
            <ActivityLogList  limit={5} />
          </section>
        </main>
      </div>
      <Modal
        show={showAddCollegeForm}
        onClose={() => setShowAddCollegeForm(false)}
        title="Add New College"
      >
        <CollegeForm onClose={() => setShowAddCollegeForm(false)} />
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
