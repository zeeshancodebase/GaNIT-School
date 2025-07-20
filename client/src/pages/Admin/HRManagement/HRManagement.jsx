import React, { useState } from "react";
import HRList from "./HRList";
import HRForm from "./HRForm";

const HRManagement = () => {
 const [editingHR, setEditingHR] = useState(null); 

  return (
    <div className="admin-dashboard container">
      <div className="admin-panel-title"><h2>Manage HRs</h2></div>
      <HRForm editingHR={editingHR} setEditingHR={setEditingHR} />
      <HRList setEditingHR={setEditingHR} />
    </div>
  );
};

export default HRManagement;
