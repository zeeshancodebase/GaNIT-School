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
       <Route path="/job-board" element={<JobBoardPage />} />
        <Route path="/faculties" element={<FacultiesPage/>} />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
         <Route path="/live" element={<LiveClasses />} />
        {/* <Route path="/demo" element={<Demo />} /> */}

        {/* Optional: fallback route 
        <Route path="*" element={<NotFound />} />*/}
      </Routes>
      {/* <Provider /> */}

    </div>
  );
}

export default App;
