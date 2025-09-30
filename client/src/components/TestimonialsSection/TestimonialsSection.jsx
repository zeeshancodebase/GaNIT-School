import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

// const testimonials = [
//   {
//     name: "Riya Sharma",
//     text: "I cracked my TCS interview in 3 months. The mock interviews and resume building helped a lot!",
//     rating: 5,
//   },
//   {
//     name: "Amit Rao",
//     text: "The Full Stack course was exactly what I needed to switch careers.",
//     rating: 4,
//   },
// ];

const testimonials = [
  {
    name: "Shwetha",
    text: "I joined aptitude training by FM sir. The sessions were well structured and covered all important topics. His way of teaching made me like aptitude, which I used to find difficult before.",
    rating: 5,
  },
  {
    name: "Ramesh K",
    text: "Fahim sir’s aptitude sessions were very useful for my banking preparation. The way he taught shortcuts and also explained the detailed methods gave me a better understanding of the subject.",
    rating: 5,
  },
  {
    name: "Divya",
    text: "The 60 hours aptitude master class conducted by FM sir gave me complete clarity in all topics. His teaching boosted my confidence, and I was able to clear my placement aptitude round.",
    rating: 5,
  },
  {
    name: "Prashant D",
    text: "The 60 hours Aptitude Master Class was very beneficial. Sir’s time-saving tricks and explanations helped me a lot, and with that preparation, I cleared my placement aptitude round.",
    rating: 5,
  },
  {
    name: "Naveen",
    text: "I attended Fahim sir’s 60 hours training, and now aptitude feels very easy for me.",
    rating: 5,
  },
  {
    name: "Shruti Patil",
    text: "I attended the 60+ hours of Aptitude Master Class by Fahim sir. The sessions were very interactive, and sir explained each topic in detail. His shortcuts and practice questions made aptitude very simple and interesting for me.",
    rating: 5,
  },
  {
    name: "Raghavendra",
    text: "The 60 hours Aptitude Master Class by FM sir helped me to understand aptitude in a systematic way. Sir’s teaching style is very clear, and he gave real-life examples, which made concepts easy to remember.",
    rating: 5,
  },
  {
    name: "Saniya",
    text: "For me, the 60 hours aptitude master class by Fahim sir was very useful. His notes and tricks are still helping me in solving questions faster.",
    rating: 5,
  },
  {
    name: "Umme Rumana",
    text: "I always thought coding is enough for placements and ignored aptitude. I even struggled in my first round. Later, I joined Fahim sir’s 60 hours master class, and it really helped me understand concepts I used to fear a lot.",
    rating: 5,
  }
];


const TestimonialsSection = ({ showViewAll = true, limit = testimonials.length }) => {
  return (
    <>
      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="courses-tracks-title">
              What Our <span className="highlight">Students Say</span>
            </h2>
            <p>Students reviews</p>
          </div>
          <div className="testimonial-list">
            {/* {testimonials.map(({ name, text, rating }, i) => ( */}
            {testimonials.slice(0, limit).map(({ name, text, rating }, i) => (
              <div className="testimonial-card" key={i}>
                <p>“{text}”</p>
                <div className="testimonial-footer">
                  <strong>{name}</strong>
                  <div className="stars">
                    {[...Array(rating)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showViewAll && (
          <Link
            to="/testimonials"
            className="view-all-btn"
            style={{ marginTop: "25px" }}
          >
            View all Reviews
            <FaArrowRight />
          </Link>
        )}
      </section>
    </>
  );
};

export default TestimonialsSection;
