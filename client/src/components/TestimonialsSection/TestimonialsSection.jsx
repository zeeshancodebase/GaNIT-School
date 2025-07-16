import React from 'react'
import { FaArrowRight, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Riya Sharma",
    text: "I cracked my TCS interview in 3 months. The mock interviews and resume building helped a lot!",
    rating: 5,
  },
  {
    name: "Amit Rao",
    text: "The Full Stack course was exactly what I needed to switch careers.",
    rating: 4,
  },
];

const TestimonialsSection = ({ showViewAll = true }) => {
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
                  {testimonials.map(({ name, text, rating }, i) => (
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
              <Link to="/testimonials" className="view-all-btn" style={{marginTop:"25px"}}>
          View all Reviews
          <FaArrowRight />
        </Link>)}
            </section>
    </>
  )
}

export default TestimonialsSection
