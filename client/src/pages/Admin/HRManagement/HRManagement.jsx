import React, { useState } from "react";
import HRList from "./HRList";
import HRForm from "./HRForm";
import Layout from "../../../Layout/Layout";

const HRManagement = () => {
  const [editingHR, setEditingHR] = useState(null);

  return (
    <Layout>
      <div className="admin-dashboard container">
        <div className="admin-panel-title">
          <h2>Manage HRs</h2>
        </div>
        <HRForm editingHR={editingHR} setEditingHR={setEditingHR} />
        <HRList setEditingHR={setEditingHR} />
      </div>
    </Layout>
  );
};

export default HRManagement;
