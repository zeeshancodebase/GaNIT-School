import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const facultyData = [
  {
    name: "Fahim Makandar",
    role: "Founder | L & D Specialist",
    description:
      "Helping students ace competitive exams with a focus on Aptitude, Logical Reasoning, and Communication Skills.",
    photo: "/assets/images/fahim.jpg",
  },
  {
    name: "Uday Hiremath",
    role: "Co-founder | AIML Engineer | Instructor",
    description:
      "Experienced Python developer and educator. Specializes in Data Science and Machine Learning.",
    photo: "/assets/images/uday.jpg",
  },
  {
    name: "Zeeshan Patel",
    role: "CTO | Full Stack Instructor",
    description:
      "Over 15 years of experience in web development and software engineering. Passionate about teaching and mentoring.",
    photo: "/assets/images/zeeshan1.jpg",
  },
];

const FacultiesSection = ({ showViewAll = true }) => {
  return (
    <>
      {/* Faculties Section */}
      <section id="faculties" className="faculties-section">
        <div className="faculties-container">
          <div className="tracks-title-container">
            <h2 className="career-tracks-title" style={{ color: "white" }}>
              Meet the <span className="highlight">Experts</span> Behind Your
              Success
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              Learn from experienced professionals who have trained 1000s of
              students.
            </p>
          </div>

          <div className="faculty-list">
            {facultyData.map((faculty, index) => (
              <div key={index} className="faculty-card-enhanced">
                <img
                  src={faculty.photo}
                  alt={faculty.name}
                  className="faculty-photo-enhanced"
                />
                <div className="faculty-info-enhanced">
                  <h3>{faculty.name}</h3>
                  <p className="faculty-role">{faculty.role}</p>
                  <p className="faculty-description">{faculty.description}</p>

                  <div className="expertise-tags">
                    <span className="tag">Python</span>
                    <span className="tag">Aptitude</span>
                    <span className="tag">Communication</span>
                  </div>

                  <div className="faculty-socials">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showViewAll && (
            <Link to="/faculties" className="view-all-btn" style={{marginTop:"25px",color:"white"}}>
              View all Faculties
              <FaArrowRight />
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default FacultiesSection;
