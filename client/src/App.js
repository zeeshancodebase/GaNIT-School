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
import JobPage from './pages/Admin/JobPage';
import HRManagement from './pages/Admin/HRManagement/HRManagement';
import Logout from './pages/LoginPage/logout';
import ResetPassword from './pages/LoginPage/resetPassword';
// import FacultyProfile from './pages/FacultyPage/FacultyProfile';
// import UnderMaintenance from './pages/UnderMaintenance/UnderMaintenance'

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}

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
        <Route path="/super-admin" element={<Admin />} />
         <Route path="/super-admin/jobs" element={<JobPage />} />
         <Route path="/jobs" element={<JobPage />} />
        <Route path="/super-admin/HRManagement" element={<HRManagement />} />
        <Route path="/hr/home" element={<HRhome />} />
        {/* <Route path="/demo" element={<Demo />} /> */}

        {/* Optional: fallback route 
        <Route path="*" element={<NotFound />} />*/}
      </Routes>
      {/* <Provider /> */}

    </div>
  );
}

export default App;
