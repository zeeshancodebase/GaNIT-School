import React, { useEffect, useState } from "react";
import { fetchHRs, deleteHR } from "../../../services/hrServices";
import "../JobAdmin.css";
import { FaBuilding, FaEnvelope,  FaUser, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
const HRList = ({ setEditingHR, limit, showViewAll = false, showActionBtn=true }) => {
  const [hrList, setHrList] = useState([]);

  useEffect(() => {
    const loadHRs = async () => {
      const data = await fetchHRs();
      setHrList(data);
    };
    loadHRs();
  }, []);

  const handleDelete = async (id) => {
    await deleteHR(id);
    setHrList(hrList.filter((hr) => hr.id !== id));
  };

    // Show limited HRs if limit is passed
  const visibleHR = limit ? hrList.slice(0, limit) : hrList;


  return (
    <div className="job-board-right admin-view">
      <div className="job-card-header">
        <h3 className="job-list-title">Manage HR Users</h3>
      </div>
      <div className="job-list-wrapper">
        {visibleHR.map((hr) => (
          <div key={hr.id} className="job-card job-card-admin">
            <div className="job-card-top">
              <div>
                <h4><FaUser /> {hr.name}</h4>
                <p className="job-company"><FaBuilding /> {hr.company}</p>
              </div>
            </div>
            <div className="job-card-bottom">
              <span className="job-info">
                <FaEnvelope className="job-icon" />
                {hr.email}
              </span>
              <span className="job-info">
                <FaPhone className="job-icon" />
                {hr.phoneNumber}
              </span>
{showActionBtn && (
              <div className="job-admin-actions">
                <button className="btn-edit" onClick={() => setEditingHR(hr)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(hr.id)}>
                  <FaTrash /> Delete
                </button>
              </div>)}
            </div>
          </div>
        ))}
        {showViewAll && (
            <Link
             to="/super-admin/HRManagement" className="admin-view-all-btn">
              View All
              <FaArrowRight />
            </Link>
          )}
      </div>
    </div>
  );
};

export default HRList;
