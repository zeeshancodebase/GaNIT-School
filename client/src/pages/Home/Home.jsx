import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Home.css";
import {
  FaBrain,
  // FaCheckCircle,
  FaCode,
  // FaGraduationCap,
  FaPlay,
  FaStar,
  FaBriefcase,
  FaClock,
  FaArrowRight,
  FaMoneyBillWave,
  FaPython,
  FaJava,
  FaFigma,
  FaUserGraduate,
  // FaUser,
  FaArrowLeft,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { TbBinaryTree, TbWorldCode } from "react-icons/tb";
import { SiTensorflow, SiAmazonwebservices, SiJenkins } from "react-icons/si";
import Avatar from "../../components/Avatar/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// Dummy Logo (replace with <img> if available)
const Logo = () => (
  <div className="logo" style={{display:"flex",flexDirection:"row", fontSize:"1rem"}}>
    {/* GaNIT<span className="highlight">School</span> */}
    <img
              src="/assets/images/logo5.png"
              alt="Logo"
              
            />
            <div style={{display:"flex", flexDirection:"column"}}>
            GANIT<span className="highlight">School</span></div>
  </div>
);

const jobStats = [
  {
    icon: <FaBriefcase className="w-5 h-5 text-neonGreen mr-2" />,
    label: "45 New Jobs",
  },
  {
    icon: <FaClock className="w-5 h-5 text-neonGreen mr-2" />,
    label: "Last Updated: Today",
  },
  {
    icon: <FaMoneyBillWave className="w-5 h-5 text-neonGreen mr-2" />,
    label: "Avg. Salary: ₹6.5L",
  },
];

const jobList = [
  {
    title: "Full Stack Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    salary: "₹8-12L",
    isNew: true,
  },
  {
    title: "Python Developer",
    company: "DataViz Analytics",
    location: "Bangalore",
    salary: "₹5-9L",
    isNew: true,
  },
  {
    title: "Frontend Developer",
    company: "UX Innovations",
    location: "Hybrid",
    salary: "₹6-10L",
    isNew: false,
  },
];

const coursesData = [
  {
    title: "Python Programming Masterclass",
    info: "You will learn Python",
    faculty: "Neha Singh",
    reviews: "4.8 (420 reviews)",
    duration: "8 weeks",
    students: "1,245",
    icon: <FaPython />,
  },
  {
    title: "Java Programming Fundamentals",
    info: "10 Weeks • 980 Students",
    faculty: "Zeeshan Patel",
    reviews: "4.7 (310 reviews)",
    duration: "10 weeks",
    students: "980",
    icon: <FaJava />,
  },
  {
    title: "Full Stack Web Development",
    info: "12 Weeks • 1,560 Students",
    faculty: "Zeeshan Patel",
    reviews: "4.9 (530 reviews)",
    duration: "12 weeks",
    students: "1,560",
    icon: <TbWorldCode />,
  },
  {
    title: "Aptitude & Logical Reasoning",
    info: "12 Weeks • 1,560 Students",
    faculty: "Fahim Makandar",
    reviews: "4.6 (290 reviews)",
    duration: "12 weeks",
    students: "1,560",
    icon: <FaBrain />,
  },
  {
    title: "Data Structures & Algorithms",
    info: "10 Weeks • 1,120 Students",
    faculty: "Anjali Mehta",
    reviews: "4.8 (400 reviews)",
    duration: "10 weeks",
    students: "1,120",
    icon: <TbBinaryTree />,
  },
  {
    title: "Machine Learning with Python",
    info: "12 Weeks • 980 Students",
    faculty: "Dr. Ankur Mathur",
    reviews: "4.9 (470 reviews)",
    duration: "12 weeks",
    students: "980",
    icon: <SiTensorflow />,
  },
  {
    title: "UI/UX Design Bootcamp",
    info: "8 Weeks • 860 Students",
    faculty: "Sneha Kapoor",
    reviews: "4.7 (280 reviews)",
    duration: "8 weeks",
    students: "860",
    icon: <FaFigma />,
  },
  {
    title: "Cybersecurity Essentials",
    info: "10 Weeks • 740 Students",
    faculty: "Rohan Deshmukh",
    reviews: "4.6 (220 reviews)",
    duration: "10 weeks",
    students: "740",
    icon: <FaShieldAlt />,
  },
  {
    title: "Cloud Computing with AWS",
    info: "9 Weeks • 910 Students",
    faculty: "Tanvi Joshi",
    reviews: "4.7 (310 reviews)",
    duration: "9 weeks",
    students: "910",
    icon: <SiAmazonwebservices />,
  },
  {
    title: "DevOps and CI/CD Practices",
    info: "11 Weeks • 675 Students",
    faculty: "Siddharth Rane",
    reviews: "4.6 (190 reviews)",
    duration: "11 weeks",
    students: "675",
    icon: <SiJenkins />,
  },
];

const tracks = [
  {
    title: "Become a Full Stack Developer",
    duration: "24 Weeks • 5 Projects",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and build real-world applications.",
    skills: ["Java Developer", "Python Developer", "MERN Stack Developer"],
    outcome: "Full Stack Developer",
    Icon: FaCode,
  },
  {
    title: "Become Data Science Expert",
    duration: "24 Weeks • 5 Projects",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and build real-world applications.",
    skills: ["Java Developer", "Python Developer", "MERN Stack Developer"],
    outcome: "Full Stack Developer",
    Icon: FaCode,
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
  {
    title: "Master Aptitude + Soft Skills",
    duration: "8 Weeks • 20 Practice Tests",
    description:
      "Comprehensive training on quantitative, logical, verbal reasoning and communication skills.",
    skills: ["Quant", "Logical", "Verbal", "Communication"],
    outcome: "Interview Ready",
    Icon: FaBrain,
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

const facultyData = [
  {
    name: "Fahim Makandar",
    role: "Founder | L & D Specialist",
    description:
      "Helping students ace competitive exams with a focus on Aptitude, Logical Reasoning, and Communication Skills.",
    photo: "/assets/images/fahim.jpg", // Replace with real images
  },
  {
    name: "Uday Hiremath",
    role: "Co-founder | AIML Engineer | Instructor",
    description:
      "Experienced Python developer and educator. Specializes in Data Science and Machine Learning.",
    photo: "/assets/images/uday.jpg", // Replace with real images
  },
  {
    name: "Zeeshan Patel",
    role: "CTO | Full Stack Instructor",
    description:
      "Over 15 years of experience in web development and software engineering. Passionate about teaching and mentoring.",
    photo: "/assets/images/zeeshan1.jpg", // You can replace this with actual photo URLs
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
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              {/* <FaGraduationCap size={35} /> */}
               <Logo />
            </Link>
          </div>
          <nav className={`nav-links ${isOpen ? "show" : ""}`}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/career-tracks">Career Tracks</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/live">Live Classes</NavLink>
            <NavLink to="/job-board">Job Board</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <button className="menu-btn" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          <a href="/about" className="btn primary">
            Join Now / Login
          </a>
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
        <div className="hero-content">
          <div className="hero-text">
            <h1
              style={{
                textAlign: "left",
                // textShadow: "0 2px 10px rgba(255, 255, 255, 0.6)",
              }}
            >
              From Skills to Career –{" "}
              <span className="highlight">Powered by GaNIT School</span>
            </h1>
            <p style={{ fontSize: "1.3rem", textAlign: "left" }}>
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
                    <Link to="/" className="btn small">
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

      {/*Job Board*/}
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
                  <span className="highlight">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="job-actions">
              <a href="/" className="btn primary">
                Apply Now
              </a>
              <a href="/" className="btn secondary">
                Resume Review
              </a>
              <a href="/" className="btn secondary">
                Book Mock Interview
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="job-board-right">
            <div className="job-card-wrapper">
              <div className="job-card-header">
                <h3>Latest Openings</h3>
                <a href="/" className="job-view-all">
                  View All
                </a>
              </div>
              <div className="job-list">
                {jobList.map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-card-top">
                      <div>
                        <h4>{job.title}</h4>
                        <p className="job-company">{job.company}</p>
                      </div>
                      {job.isNew && <span className="job-new">New</span>}
                    </div>
                    <div className="job-card-bottom">
                      <span className="job-info">
                        <FaMapMarkerAlt className="job-icon" />
                        {job.location}
                      </span>
                      <span className="job-info">
                        <FaMoneyBillWave className="job-icon" />
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
          <div className="tracks-title-container">
            <h2 className="courses-tracks-title">
              Top <span className="highlight">Courses</span>
            </h2>
            <p>
              Our top courses, expertly crafted to support your learning journey
            </p>
          </div>

          {/* 🚀 Custom Buttons */}
          <div className="custom-swiper-nav">
            <button className="custom-swiper-button prev" id="customPrevBtn">
              <FaArrowLeft />
            </button>
            <button className="custom-swiper-button next" id="customNextBtn">
              <FaArrowRight />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: "#customNextBtn",
              prevEl: "#customPrevBtn",
            }}
            pagination={{ clickable: true }}
          >
            {coursesData.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="course-card">
                  <div className="course-icon">{course.icon}</div>
                  <div className="course-body">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="faculty-profile">
                      <Avatar size={48} />
                      <div className="course-faculty">
                        <p>{course.faculty}</p>
                        <p>
                          <FaStar /> {course.reviews}
                        </p>
                      </div>
                    </div>
                    <p className="course-info">
                      <span className="course-duration">
                        <FaClock /> {course.duration}
                      </span>
                      <span className="course-students">
                        <FaUserGraduate /> {course.students} Students
                      </span>
                    </p>
                    <a href="/" className="btn small">
                      Enroll Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* <section id="courses" className="courses">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="courses-tracks-title">
              Top <span className="highlight">Courses</span>
            </h2>
            <p>
              Our top courses, expertly crafted to support your learning journey
            </p>
          </div>

          <div className="course-list">
            {coursesData.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <div
                  style={{
                    background: "white",
                    background: "#f9f9f9",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    padding: "16px",
                    color: "#111",
                  }}
                >
                  <h3 className="course-title">{course.title}</h3>

                  <div className="faculty-profile">
                    <Avatar size={48} />
                    <div className="course-faculty">
                      <p>{course.faculty}</p>
                      <p>
                        <FaStar />
                        {course.reviews}
                      </p>
                    </div>
                  </div>
                  <p className="course-info">
                    {" "}
                    <span className="course-duration">
                      <FaClock /> {course.duration}
                    </span>
                    <span className="course-students">
                      <FaUserGraduate /> {course.students} Students
                    </span>
                  </p>
                  <a href="/" className="btn small">
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Faculties Section */}
      {/* <section id="faculties" className="faculties">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="career-tracks-title" style={{color:"white"}}>
         
            Meet the <span className="highlight">Experts</span> Behind Your
            Success
          </h2>
          <p>
              Our top Faculties
            </p>
          </div>

          <div className="faculty-list">
            {facultyData.map((faculty, index) => (
              <div key={index} className="faculty-card">
                <img
                  src={faculty.photo}
                  alt={faculty.name}
                  className="faculty-photo"
                />
                {/* <Avatar src={"/"} size={48} />

                <Avatar size={48} /> 
                <div className="faculty-info">
                  <h3>{faculty.name}</h3>
                  <p className="faculty-role">{faculty.role}</p>
                  <p className="faculty-description">{faculty.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Faculties Section */}
<section id="faculties" className="faculties-section">
  <div className="faculties-container">
    <div className="tracks-title-container">
      <h2 className="career-tracks-title" style={{ color: "white" }}>
        Meet the <span className="highlight">Experts</span> Behind Your Success
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
        Learn from experienced professionals who have trained 1000s of students.
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
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="courses-tracks-title">
              What Our <span className="highlight">Students Say</span>
            </h2>
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
