import React from "react";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import Navbar from "../../components/Navbar/Navbar";
import VideoTestimonials from "../../components/TestimonialsSection/VideoTestimonials";
import Footer from "../../components/Footer/Footer";
import TestimonialsRatingsSummary from "../../components/TestimonialsSection/TestimonialsRatingsSummary";

const Testimonials = () => {
  return (
    <div>
      <Navbar />
      <VideoTestimonials/>
      <TestimonialsRatingsSummary/>
      <TestimonialsSection showViewAll={false} />
      <Footer/>
    </div>
  );
};

export default Testimonials;
