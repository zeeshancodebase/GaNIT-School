import React from "react";
import "./CareerTracks.css";
import { FaCode, FaGraduationCap, FaBrain } from "react-icons/fa";

const tracksData = [
  {
    title: "Become a Full Stack Developer",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js and build real-world applications.",
    icon: <FaCode />,
  },
  {
    title: "Crack Placements in 90 Days",
    description: "Intensive preparation with aptitude, DSA, and interview practice.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Master Aptitude + Soft Skills",
    description:
      "Training on quantitative, logical, verbal reasoning and communication skills.",
    icon: <FaBrain />,
  },
];

const CareerTracks = () => {
  return (
    <section id="career-tracks" className="tracks">
      <div className="container">
        <h2>
          Choose Your <span className="highlight">Career Track</span>
        </h2>
        <p>
          Structured learning paths designed to take you from beginner to job-ready
          professional
        </p>
        <div className="track-list">
          {tracksData.map((track, index) => (
            <div key={index} className="track-card">
              <div className="track-icon">{track.icon}</div>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <a href="#" className="btn small">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTracks;
