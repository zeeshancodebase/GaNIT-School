import "./Home.css";
import {
  FaBrain,
  // FaCheckCircle,
  FaCode,
  FaGraduationCap,
  FaPlay,
  FaStar,
    FaBriefcase,
  FaClock,
  FaRupeeSign
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";


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

const jobStats = [
  {
    icon: <FaBriefcase className="w-5 h-5 text-neonGreen mr-2" />,
    label: '45 New Jobs'
  },
  {
    icon: <FaClock className="w-5 h-5 text-neonGreen mr-2" />,
    label: 'Last Updated: Today'
  },
  {
    icon: <FaRupeeSign className="w-5 h-5 text-neonGreen mr-2" />,
    label: 'Avg. Salary: ₹6.5L'
  }
];


const jobList = [
  {
    title: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'Remote',
    salary: '₹8-12L',
    isNew: true
  },
  {
    title: 'Python Developer',
    company: 'DataViz Analytics',
    location: 'Bangalore',
    salary: '₹5-9L',
    isNew: true
  },
  {
    title: 'Frontend Developer',
    company: 'UX Innovations',
    location: 'Hybrid',
    salary: '₹6-10L',
    isNew: false
  }
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
          <div className="track-icon">
           <FaGraduationCap /> <Logo /></div>
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
          <button className="btn primary" >
            Join Now / Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="hero">
        {/* Background Video */}
        <video className="hero-video" autoPlay muted loop playsInline>
          {/* <source src="/hero-bg.mp4" type="video/mp4" /> */}
          <source src="/assets/videos/bg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Overlay */}
        <div className="hero-overlay"></div>
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
            <div className="students-note">
  <div className="avatar-group">
    <FaUserCircle className="avatar-icon" />
    <FaUserCircle className="avatar-icon" />
    <FaUserCircle className="avatar-icon" />
    <FaUserCircle className="avatar-icon" />
  </div>
  <p>
    <strong>5,000+</strong> students already learning
  </p>
</div>
          </div>
          <div className="hero-img">
            <div className="illustration" />
            <img
              src="/assets/svg/illustration.svg"
              alt="Coding Illustration"
              className="hero-illustration"
            />
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section id="career-tracks" className="tracks">
        <div className="container">
          <h2 className="career-tracks-title">
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


      <section id="job-board" className="job-board">
  <div className="container job-board-wrapper">
    {/* Left Panel */}
    <div className="job-board-left">
      <h2 className="job-board-title">Live Job Board</h2>
      <p className="job-board-subtitle">
        100+ Companies Hiring GaNIT School Graduates
      </p>

     <div className="job-stats">
  {jobStats.map((stat, index) => (
    <div key={index} className="job-stat">
      {stat.icon}
      <span>{stat.label}</span>
    </div>
  ))}
</div>


      <div className="job-actions">
        <a href="/" className="btn primary">Apply Now</a>
        <a href="/" className="btn secondary">Resume Review</a>
        <a href="/" className="btn secondary">Book Mock Interview</a>
      </div>
    </div>

    {/* Right Panel */}
    <div className="job-board-right">
      <div className="job-card-wrapper">
        <div className="job-card-header">
          <h3>Latest Openings</h3>
          <a href="/" className="job-view-all">View All</a>
        </div>
        <div className="job-list">
          {jobList.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-card-top">
                <div>
                  <h4>{job.title}</h4>
                  <p className="job-company">{job.company}</p>
                </div>
                {job.isNew && (
                  <span className="job-new">New</span>
                )}
              </div>
              <div className="job-card-bottom">
                <span className="job-info">
                  <FaMapMarkerAlt className="job-icon" />
                  {job.location}
                </span>
                <span className="job-info">
                  <FaRupeeSign className="job-icon" />
                  {job.salary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Courses */}
      <section id="courses" className="courses">
        <div className="container">
          <h2 className="courses-tracks-title">
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
