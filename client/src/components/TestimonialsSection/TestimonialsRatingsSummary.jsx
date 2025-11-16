import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import './TestimonialsRatingsSummary.css'

const SHEET_ID = "1QZH7SVQaqmFwOtfU-kHVh6ftMwfMeweoE8q8JknkBNY";
const SHEET_NAME = "Testimonials";

const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(
  SHEET_NAME
)}`;

// https://docs.google.com/spreadsheets/d/1QZH7SVQaqmFwOtfU-kHVh6ftMwfMeweoE8q8JknkBNY/edit?usp=sharing


const TestimonialsRatingsSummary = () => {
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
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

        const ratings = rows
          .map((row) => {
            const cells = row.c || [];

            // Sheet format: id | name | role | rating | text
            const ratingRaw = cells[3]?.v;
            const ratingNum = Number(ratingRaw);
            if (!Number.isFinite(ratingNum) || ratingNum <= 0) return null;
            return Math.max(1, Math.min(5, Math.round(ratingNum)));
          })
          .filter(Boolean);

        if (!ratings.length) {
          setStats({
            total: 0,
            average: 0,
            counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          });
          return;
        }

        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let sum = 0;

        ratings.forEach((r) => {
          counts[r] += 1;
          sum += r;
        });

        const total = ratings.length;
        const average = sum / total;

        setStats({ total, average, counts });
      } catch (err) {
        console.error("Error fetching rating stats:", err);
        setError(
          "Unable to load rating summary right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const { total, average, counts } = stats;

  return (
    <section className="ratings-summary">
      <div className="container ratings-summary-container">
        <div className="ratings-summary-main">
          <h2 className="ratings-title">Student Ratings</h2>
          {loading && !error && <p>Loading rating summary...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div className="ratings-score">
                <div className="ratings-score-value">
                  {average.toFixed(1)}
                </div>
                <div className="ratings-score-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      className={
                        i <= Math.floor(average)
                          ? "star star-filled"
                          : "star star-empty"
                      }
                    />
                  ))}
                </div>
                <div className="ratings-score-text">
                  Average rating from {total} students
                </div>
              </div>
            </>
          )}
        </div>

        {!loading && !error && total > 0 && (
          <div className="ratings-distribution">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star] || 0;
              const percent = total ? (count / total) * 100 : 0;

              return (
                <div className="ratings-row" key={star}>
                  <div className="ratings-row-label">
                    {star} <FaStar className="star star-small" />
                  </div>
                  <div className="ratings-bar">
                    <div
                      className="ratings-bar-fill"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="ratings-row-count">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsRatingsSummary;
