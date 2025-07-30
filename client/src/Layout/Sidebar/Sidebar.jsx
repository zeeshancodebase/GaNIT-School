import React from 'react';
import './Sidebar.css';
import {
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaChartBar,
  FaUserShield,
  FaUsersCog,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { MdDashboard } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
    { id: 'products', label: 'Products', icon: <FaBoxOpen />, path: '/inventory' },
    { id: 'billing', label: 'Billing', icon: <FaFileInvoiceDollar />, path: '/new-sale' },
    { id: 'reports', label: 'Reports', icon: <FaChartBar />, path: '/reports' },
    ...(user?.isOwner
      ? [
          { id: 'staff', label: 'Manage Staff', icon: <FaUsersCog />, path: '/manage-staff' },
          { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/settings' },
        ]
      : []),
  ];

  return (
    <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-close" onClick={onClose}> Rahmet Textile    <span> ×</span></div>
        {items.map(item => (
          <div
            key={item.id}
            className="sidebar-item"
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <hr />
        <div
          className="sidebar-item logout"
          onClick={() => {
            navigate("/logout");
            onClose();
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
