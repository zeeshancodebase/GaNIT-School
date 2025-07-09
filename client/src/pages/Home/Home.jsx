import "./Home.css";
import {
  FaBrain,
  // FaCheckCircle,
  FaCode,
  FaGraduationCap,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

// Dummy Logo (replace with <img> if available)
const Logo = () => (
  <span className="logo">
    GaNIT<span className="highlight">School</span>
  </span>
);

const tracksData = [
  {
    title: "Become a Full Stack Developer",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js and build real-world applications.",
    icon: <FaCode />,
  },
  {
    title: "Crack Placements in 90 Days",
    description:
      "Intensive preparation with aptitude, DSA, and interview practice.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Master Aptitude + Soft Skills",
    description:
      "Training on quantitative, logical, verbal reasoning and communication skills.",
    icon: <FaBrain />,
  },
];

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

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="container">
          <a href="/" className="logo-link">
            <Logo />
          </a>
          <nav className={`nav-links ${isOpen ? "show" : ""}`}>
            <a href="/">Home</a>
            <a href="/career-tracks">Career Tracks</a>
            <a href="/courses">Courses</a>
            <a href="/live">Live Classes</a>
            <a href="/job-board">Job Board</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <button className="menu-btn" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              From Skills to Career –{" "}
              <span className="highlight">Powered by GaNIT School</span>
            </h1>
            <p>
              Learn Python, Java, Aptitude, Full Stack & Crack Your Dream Job
            </p>
            <div className="hero-buttons">
              <a href="/courses" className="btn primary">
                Explore Courses
              </a>
              <a href="/demo" className="btn secondary">
                <FaPlay className="play-icon" /> Watch Demo Class
              </a>
            </div>
            <p className="students-note">
              Join <strong>5,000+</strong> students already learning
            </p>
          </div>
          <div className="hero-img">
            <img
              src="/assets/hero-illustration.svg"
              alt="Learning illustration"
            />
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section id="career-tracks" className="tracks">
        <div className="container">
          <h2>
            Choose Your <span className="highlight">Career Track</span>
          </h2>
          <p>
            Structured paths to take you from beginner to job-ready professional
          </p>
          <div className="track-list">
            {tracksData.map((track, index) => (
              <div key={index} className="track-card">
                <div className="track-icon">{track.icon}</div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <a href="/" className="btn small">
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
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
                <a href="/" className="btn small">
                  Enroll Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>
            What Our <span className="highlight">Students Say</span>
          </h2>
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
      </section>

      {/* Footer */}
      <footer id="contact" className="home-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>&copy; 2025 GaNIT School. All rights reserved.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/courses">Courses</a>
              </li>
              <li>
                <a href="/career-tracks">Career Tracks</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              Email: <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
            </p>
            <p>Phone: +91-9876543210</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
