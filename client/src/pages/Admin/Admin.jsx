
import JobList from "./JobList";

import HRList from "./HRManagement/HRList";
import Navbar from "../../components/Navbar/Navbar";

const Admin = () => {

  return (
    <>
    <Navbar/>
    <div className="admin-dashboard container">
      <div className="admin-panel-title">
        <h2>Admin Panel</h2>
        <hr className="admin-title-divider" />
      </div>
      
      <div className="job-portal-section">
    
        <JobList limit={3} showViewAll={true} showActionBtn={false}/>

         
      </div>
      <div className="hr-portal-section">
        <HRList limit={3} showViewAll={true} showActionBtn={false}/>
      </div>
    </div></>
  );
};

export default Admin;
