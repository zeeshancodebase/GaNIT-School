import React, { useState } from "react";
import JobForm from "../Admin/JobForm";
import JobList from "../Admin/JobList";
import Navbar from "../../components/Navbar/Navbar";

const HRhome = () => {
  const [editingJob, setEditingJob] = useState(null);

  return (
    <>
      <Navbar />
      <div className="admin-dashboard container">
        <div className="admin-panel-title">
        <h2>HR Panel</h2></div>
        <JobForm editingJob={editingJob} setEditingJob={setEditingJob} />
        <JobList setEditingJob={setEditingJob} />
      </div>
    </>
  );
};

export default HRhome;
