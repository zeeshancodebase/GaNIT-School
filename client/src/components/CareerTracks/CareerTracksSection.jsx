import React from "react";
import "./CareerTracks.css";
import {
  FaCode,
  // FaGraduationCap,
  FaBrain,
} from "react-icons/fa";
import { FaArrowRight, FaChartLine, FaClock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const tracks = [
  {
    title: "Become a Full Stack Developer",
    duration: "15 Weeks • 5 Projects",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and build real-world applications.",
    skills: [
      "Java Developer",
      // "Python Developer",
      "MERN Stack Developer",
    ],
    outcome: "Full Stack Developer",
    Icon: FaCode,
  },
  {
    title: "Become Data Science Expert",
    duration: "15 Weeks • 5 Projects",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and build real-world applications.",
    skills: ["Java Developer", "Python Developer", "MERN Stack Developer"],
    outcome: "Data Scientist",
    Icon: FaChartLine,
  },
  {
    title: "Master Aptitude + Soft Skills",
    duration: "8 Weeks • 20 Practice Tests",
    description:
      "Comprehensive training on quantitative, logical, verbal reasoning and communication skills.",
    skills: ["Quant", "Logical", "Verbal", "Communication"],
    outcome: "Interview Ready",
    Icon: FaBrain,
  },
  // {
  //   title: "Crack Placements in 90 Days",
  //   duration: "12 Weeks • 30 Mock Interviews",
  //   description:
  //     "Intensive placement preparation with aptitude training, DSA, and interview practice.",
  //   skills: ["DSA", "Aptitude", "Mock Interviews", "Resume"],
  //   outcome: "Job Placement",
  //   Icon: FaGraduationCap,
  // },
];

const CareerTracksSection = () => {
  return (
    <>
      {/* Career Tracks */}
      <section id="career-tracks" className="tracks">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="career-tracks-title">
              Choose Your <span className="highlight">Career Track</span>
            </h2>
            <p>
              Structured learning paths designed to take you from beginner to
              job-ready professional
            </p>{" "}
          </div>

          <div className="track-list">
            {tracks.map(
              (
                { title, duration, description, skills, outcome, Icon },
                index
              ) => (
                <div key={index} className="track-card">
                  <div className="track-icon">
                    <Icon />
                  </div>

                  <h3>{title}</h3>

                  <div className="duration-section">
                    <FaClock />
                    <span>{duration}</span>
                  </div>

                  <p>{description}</p>

                  <div className="skills-sections">
                    {skills.map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="outcome-section">
                    <div>
                      <p>Outcome</p>
                      <p>{outcome}</p>
                    </div>
                    <Link to="/course-details" className="btn small">
                      View Details{" "}
                      <FaArrowRight style={{ marginLeft: "5px" }} />
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerTracksSection;
