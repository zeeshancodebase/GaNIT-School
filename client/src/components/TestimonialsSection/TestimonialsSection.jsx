import React, { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SHEET_ID = "1kQ-tBHlg5ei7T5PfkxsGzsy6uEityZGi959uuOHZt00";
const SHEET_NAME = "Testimonials"; // tab name in your sheet

const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(
  SHEET_NAME
)}`;

const TestimonialsSection = ({ showViewAll = true, limit }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(GOOGLE_SHEET_URL);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const text = await res.text();

        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        if (start === -1 || end === -1) {
          throw new Error("Unexpected Google Sheets response format");
        }

        const jsonStr = text.substring(start, end + 1);
        const data = JSON.parse(jsonStr);

        const rows = data?.table?.rows || [];

        const parsed = rows
  .map((row) => {
    const cells = row.c || [];

    const _id = cells[0]?.v || "";
    const name = cells[1]?.v || "";
    const role = cells[2]?.v || "";
    const ratingRaw = cells[3]?.v;
    const textVal = cells[4]?.v || "";

    const ratingNum = Number(ratingRaw);
    const rating =
      Number.isFinite(ratingNum) && ratingNum > 0 ? ratingNum : 5; // default 5

    return { _id, name, role, text: textVal, rating };
  })
  .filter((t) => t.name && t.text);


        setTestimonials(parsed);
      } catch (err) {
        console.error("Error fetching testimonials from Google Sheets:", err);
        setError(
          "Unable to load testimonials right now. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const list = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="testimonials">
      <div className="container">
        <div className="tracks-title-container">
          <h2 className="courses-tracks-title">
            What Our <span className="highlight">Students Say</span>
          </h2>
          <p>Students reviews</p>
        </div>

        {loading && !error && <p>Loading testimonials...</p>}

        {error && (
          <p style={{ color: "red", marginTop: "16px" }}>
            {error}
          </p>
        )}

        {!loading && !error && list.length === 0 && (
          <p style={{ marginTop: "16px" }}>
            No testimonials available right now.
          </p>
        )}

        {!loading && !error && list.length > 0 && (
          <div className="testimonial-list" style={{
          maxHeight: "100vh",
          overflowY: "auto",
        }}>
            {list.map(({_id, name, role, text, rating }, i) => (
              <div className="testimonial-card"  key={_id || `${name}-${i}`}>
                <p className="testimonial-text">“{text}”</p>

                <div className="testimonial-footer">
                  <div className="testimonial-meta">
                    <div className="testimonial-name">{name}</div>
                    {role && <div className="testimonial-role">{role}</div>}
                  </div>

                    <div
                      className="stars"
                      aria-label={`${rating} star rating`}
                    >
                      {[...Array(rating)].map((_, idx) => (
                        <FaStar key={idx} className="star" />
                      ))}
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showViewAll && (
          <Link
            to="/testimonials"
            className="view-all-btn testimonials-cta"
          >
            View all Reviews
            <FaArrowRight />
          </Link>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
