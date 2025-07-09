import React from "react";
import "./Hero.css";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>
            From Skills to Career –{" "}
            <span className="highlight">Powered by GaNIT School</span>
          </h1>
          <p>Learn Python, Java, Aptitude, Full Stack & Crack Your Dream Job</p>
          <div className="hero-buttons">
            <a href="#courses" className="btn primary">
              Explore Courses
            </a>
            <a href="#" className="btn secondary">
              <FaPlay className="play-icon" /> Watch Demo Class
            </a>
          </div>
          <p className="students-note">
            Join <strong>5,000+</strong> students already learning
          </p>
        </div>
        <div className="hero-img">
          <div className="illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
