import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
import Home from './pages/Home/Home';
import CareerTracks from './pages/CareerTracksPage/CareerTracks';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import JobBoardPage from './pages/Jobs/JobBoardPage';
import FacultiesPage from './pages/FacultyPage/FacultiesPage';
import Testimonials from './pages/Testimonials/Testimonials';
import About from './pages/About/About';
import ContactUs from './pages/ContactUs/ContactUs';
import LiveClasses from './pages/LiveClasses/LiveClasses';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import LoginPage from './pages/LoginPage/LoginPage';
import Admin from './pages/Admin/Admin';
import HRhome from './pages/HRpages/HRhome';
import JobPage from './pages/Admin/Jobs/JobPage';
import HRManagement from './pages/Admin/HRManagement/HRManagement';
import Logout from './pages/LoginPage/logout';
import ResetPassword from './pages/LoginPage/resetPassword';
import { store } from './app/store';
import { Provider } from "react-redux";
import CandidateForm from './pages/JobLeads/CandidateForm';
import { Error } from './pages/Error/Error';
// import CandidateList from './pages/JobLeads/CandidateList';
import ThankYouPage from './pages/ThankYouPage';
import CollegeOutreachDashboard from './pages/CollegeOutreachDashboard/CollegeOutreachDashboard';
import CandidateOutreachDashboard from './pages/JobLeads/CandidateOutreachDashboard';
// import Clglist from './pages/CollegeOutreachDashboard/Clglist';
// import FacultyProfile from './pages/FacultyPage/FacultyProfile';
// import UnderMaintenance from './pages/UnderMaintenance/UnderMaintenance'

function App() {
  return (
    <div className="App">
      <Provider store={store}>

        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/career-tracks" element={<CareerTracks />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/job-board" element={<JobBoardPage />} />
          <Route path="/faculties" element={<FacultiesPage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/live" element={<LiveClasses />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          {/* <Route path="/faculty/profile" element={<FacultyProfile />} /> */}
          <Route path="/super-admin-panel" element={<Admin />} />
          <Route path="/super-admin/jobs" element={<JobPage />} />
          <Route path="/jobs" element={<JobPage />} />
          <Route path="/jobs/apply-now/:jobId" element={<CandidateForm />} />
          <Route path="/super-admin/HRManagement" element={<HRManagement />} />
          <Route path="/super-admin/Leads" element={<CandidateOutreachDashboard />} />
          <Route path="/college-outreach" element={<CollegeOutreachDashboard />} />
          {/*<Route path="/college-outreach" element={<Clglist />} />*/}
          <Route path="/hr/home" element={<HRhome />} />
          {/* <Route path="/demo" element={<Demo />} /> */}

          {/* Optional: fallback route */}
          <Route path="*" element={<Error />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Provider >

    </div>
  );
}

export default App;
