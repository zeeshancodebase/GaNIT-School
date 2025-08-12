import React, { useEffect, useState } from "react";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaUsers, FaStar, FaBrain } from "react-icons/fa";
// import { TbWorld } from "react-icons/tb";
import { getAllUsers } from "../../services/userService";
import Footer from "../../components/Footer/Footer";

const facultyData = [
  {
    name: "Fahim Makandar",
    role: "Founder & CEO – GaNIT School",
    description:
      "Helping students ace competitive exams with a focus on Aptitude, Logical Reasoning, and Communication Skills.",
    photo: "/assets/images/fahim.jpg",
    expertise: [
      "Advance Aptitude",
      "Quantitative Aptitude",
      "Logical Reasoning",
      "Communication Skills",
    ],
  },
  {
    name: "Uday Hiremath",
    role: "COO & Co-founder | AIML Engineer | Instructor",
    description:
      "Experienced Python developer and educator. Specializes in Data Science and Machine Learning.",
    photo: "/assets/images/uday.jpg",
    expertise: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Tensorflow",
      "NLP",
      "LLMs",
    ],
  },
  {
    name: "Zeeshan Patel",
    role: "Head of Technology & Java Program Lead",
    // description:
    //   "Over 2 years of experience in Full Stack development and software engineering. Passionate about teaching, mentoring & Creating Seamless Digital Experience.",
    description:
      "Experienced in Full Stack development and software engineering. Passionate about teaching, mentoring & Creating Seamless Digital Experience.",
    photo: "/assets/images/zeeshan.jpg",
    expertise: [
      "Java",
      "MERN Stack",
      "RESTful APIs",
      "Full Stack Development",
      "Agile Methodologies",
    ],
  },
];

const About = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(faculty);
  

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log(users);

        // Filter out faculty members (Assume that faculty role is identified as 'faculty' in the user object)
        const facultyMembers = users.filter((user) => user.role === "faculty");
        setFaculty(facultyMembers);
        console.log(facultyMembers);

        setLoading(false);
      } catch (error) {
        setError("Failed to load faculty members.");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Loading faculty details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-section">
            <div className="hero-content">
              <h1>
                Welcome to <span className="highlight">GaNIT School</span>
              </h1>
              <p>
                Empowering the next generation of tech professionals through
                cutting-edge training and real-world learning experiences.
              </p>
              <div className="hero-buttons">
                <Link to="/courses" className="btn primary">
                  Explore Courses
                </Link>
                <Link to="/demo" className="btn secondary">
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-section">
            {facultyData[0] && (
              <div className="faculty-card">
                <img
                  src={facultyData[0].photo}
                  alt={facultyData[0].name}
                  className="faculty-photo-enhanced"
                />
                <div className="faculty-info">
                  <h3>{facultyData[0].name}</h3>
                  <p className="faculty-role">{facultyData[0].role}</p>
                  <p className="faculty-description">
                    {facultyData[0].description}
                  </p>

                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <h2>Our Mission & Vision</h2>
          <p>
            GaNIT (Gravitas Academy for Next Gen Intelligence Training) is
            dedicated to providing top-tier education and skill-building to
            individuals aspiring to excel in the world of technology and
            innovation. Our goal is to nurture talent and build professionals
            who can thrive in the fast-evolving tech landscape.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="value-list">
            <div className="value-item">
              <FaBrain className="value-icon" />
              <h3>Innovation</h3>
              <p>
                We embrace creativity and integrate new technologies to keep our
                curriculum relevant and forward-thinking.
              </p>
            </div>
            <div className="value-item">
              <FaStar className="value-icon" />
              <h3>Excellence</h3>
              <p>
                We strive for the highest standards in both teaching and student
                outcomes. Excellence is at our core.
              </p>
            </div>
            <div className="value-item">
              <FaUsers className="value-icon" />
              <h3>Support</h3>
              <p>
                We offer continuous mentorship, career support, and guidance to
                ensure our students thrive in their careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      {/* <section className="expertise">
        <div className="container">
          <h2>Meet the Experts</h2>
          <p>
            Learn from experienced professionals who have trained 1000+ students
            across various domains.
          </p>
          <div className="faculty-cards">
            // {/* Faculty Cards 
            <div className="faculty-card">
              <img src="/assets/images/zeeshan1.jpg" alt="Zeeshan Patel" />
              <div className="faculty-info">
                <h3>Zeeshan Patel</h3>
                <p>CTO | Full Stack Instructor</p>
                <p>
                  With over 15 years of experience, Zeeshan mentors students in
                  Full Stack Development and software engineering.
                </p>
              </div>
            </div>
            <div className="faculty-card">
              <img src="/assets/images/zeeshan1.jpg" alt="Zeeshan Patel" />
              <div className="faculty-info">
                <h3>Zeeshan Patel</h3>
                <p>CTO | Full Stack Instructor</p>
                <p>
                  With over 15 years of experience, Zeeshan mentors students in
                  Full Stack Development and software engineering.
                </p>
              </div>
            </div>
            <div className="faculty-card">
              <img src="/assets/images/fahim.jpg" alt="Fahim Makandar" />
              <div className="faculty-info">
                <h3>Fahim Makandar</h3>
                <p>Founder | L&D Specialist</p>
                <p>
                  Fahim specializes in Aptitude, Logical Reasoning, and Career
                  Development. His courses have helped students crack top tech
                  interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Expertise 
      <section className="expertise">
        <div className="container">
          <h2>Meet the Experts</h2>
          <p>
            Learn from experienced professionals who have trained 1000+ students
            across various domains.
          </p>
          <div className="faculty-cards">
            {faculty.map((facultyMember) => (
              <div className="faculty-card" key={facultyMember.id}>
                <img
                  src={
                    facultyMember.profilePicture ||
                    "/assets/images/default-avatar.jpg"
                  }
                  alt={facultyMember.name}
                />
                <div className="faculty-info">
                  <h3>{facultyMember.name}</h3>
                  <p>{facultyMember.position}</p>
                  <p>{facultyMember.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}
      <section className="expertise">
        <div className="container">
          <div className="faculty-cards">
            {facultyData.map((faculty, index) => (
              <div key={index} className="faculty-card">
                <img
                  src={faculty.photo}
                  alt={faculty.name}
                  className="faculty-photo-enhanced"
                />
                <div className="faculty-info">
                  <h3>{faculty.name}</h3>
                  <p className="faculty-role">{faculty.role}</p>
                  <p className="faculty-description">{faculty.description}</p>

                  <div className="expertise-tags">
                    {/* Map through expertise array */}
                    {faculty.expertise && faculty.expertise.length > 0 ? (
                      faculty.expertise.map((item, idx) => (
                        <span key={idx} className="tag">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="tag">No Expertise Available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="join-us">
        <div className="container">
          <h2>Join GaNIT School Today</h2>
          <p>
            Take the first step toward a successful career in tech by enrolling
            today. We’re here to guide you every step of the way.
          </p>
          <div className="join-btns">
            <Link to="/about" className="btn primary">
              Join Now
            </Link>
            <Link to="/contact" className="btn secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
