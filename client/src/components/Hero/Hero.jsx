import React from "react";
import "./Hero.css";
import { FaPlay, 
  // FaUserCircle 
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (<>
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
              Learn Java, Python, Aptitude, Full Stack & Crack Your Dream Job
            </p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn primary">
                Explore Courses
              </Link>
              <Link to="/demo" className="btn secondary">
                <FaPlay className="play-icon" /> Watch Demo Class
              </Link>
            </div>
            {/* <div className="students-note">
              <div className="avatar-group">
                <FaUserCircle className="avatar-icon" />
                <FaUserCircle className="avatar-icon" />
                <FaUserCircle className="avatar-icon" />
                <FaUserCircle className="avatar-icon" />
              </div>
              <p>
                <strong>5,000+</strong> students already learning
              </p>
            </div> */}
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
</>
  );
};

export default Hero;
