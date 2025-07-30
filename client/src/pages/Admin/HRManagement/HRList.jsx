import React, { useEffect } from "react";
import "../JobAdmin.css";
import {
  FaBuilding,
  FaEnvelope,
  FaUser,
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaLink,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHRs, removeHR } from "../../../app/slices/hrSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const HRList = ({
  setEditingHR,
  limit,
  showViewAll = false,
  showActionBtn = true,
}) => {
  const dispatch = useDispatch();
  const { list: hrList, isLoading } = useSelector((state) => state.hr);

  useEffect(() => {
    dispatch(fetchAllHRs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this HR user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(removeHR(id)).unwrap();
        toast.success("HR deleted successfully");
        dispatch(fetchAllHRs()); // ✅ ensures list is fresh from backend
      } catch (error) {
        toast.error("Failed to delete HR");
      }
    }
  };

  // useEffect(() => {
  //   const loadHRs = async () => {
  //     const data = await fetchHRs();
  //     setHrList(data);
  //   };
  //   loadHRs();
  // }, []);

  // const handleDelete = async (id) => {
  //   await deleteHR(id);
  //   setHrList(hrList.filter((hr) => hr.id !== id));
  // };

  // Show limited HRs if limit is passed
  const visibleHR = limit ? hrList.slice(0, limit) : hrList;

  return (
    <div className="job-board-right admin-view">
      <div className="job-card-header">
        <h3 className="job-list-title">
          Manage HR Users
          <Link to="/super-admin/HRManagement" class="job-view-all">
            View All <FaArrowRight />
          </Link>
        </h3>
      </div>
      <div className="job-list-wrapper">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : (
          visibleHR.map((hr) => (
            <div key={hr.id} className="job-card job-card-admin">
              <div className="job-card-top">
                <div>
                  <h4>
                    <FaUser /> {hr.name}
                  </h4>
                  <p className="job-company">
                    <FaBuilding /> {hr.company}
                  </p>
                </div>
              </div>

              <span className="job-info">
                <FaEnvelope className="job-icon" />
                {hr.email}
              </span>
              <span className="job-info">
                <FaPhone className="job-icon" />
                {hr.phoneNumber}
              </span>
              <span className="job-info">
                <FaLink className="job-icon" />
                {hr.companyWebsite}
              </span>
              <div className="job-admin-actions">
                {showActionBtn && (
                  <div className="job-admin-actions">
                    <button
                      className="btn-edit"
                      onClick={() => setEditingHR(hr)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(hr._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {showViewAll && (
          <Link to="/super-admin/HRManagement" className="admin-view-all-btn">
            Manage HRs
            <FaArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HRList;
