import React from "react";
import "./Courses.css";

const coursesData = [
  {
    title: "Python Programming Masterclass",
    info: "8 Weeks • 1,245 Students",
  },
  {
    title: "Java Programming Fundamentals",
    info: "10 Weeks • 980 Students",
  },
  {
    title: "Full Stack Web Development",
    info: "12 Weeks • 1,560 Students",
  },
];

const Courses = () => {
  return (
    <section id="courses" className="courses">
      <div className="container">
        <h2>
          Top <span className="highlight">Courses</span>
        </h2>
        <div className="course-list">
          {coursesData.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.info}</p>
              <a href="#" className="btn small">
                Enroll Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
