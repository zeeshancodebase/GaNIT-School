import "./Home.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import JobBoard from "../../components/JobBoard/JobBoard";
import CareerTracksSection from "../../components/CareerTracks/CareerTracksSection";
import CoursesSection from "../../components/Courses/CoursesSection";
// import FacultiesSection from "../../components/FacultiesSection/FacultiesSection";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import Hero from "../../components/Hero/Hero";


const Home = () => {

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <Hero/>

      {/* Career Tracks */}
      <CareerTracksSection />

      {/*Job Board*/}
      <JobBoard />

      {/* Courses */}
      <CoursesSection showViewAll={true} />

      {/* Faculties Section 
      <FacultiesSection />*/}

      {/* Testimonials */}
        <TestimonialsSection showViewAll={true} limit={3}/>
        
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
