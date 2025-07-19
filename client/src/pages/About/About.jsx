import React from 'react'
import './About.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link} from "react-router-dom";

const About = () => {
  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <section id="about" className="about-hero">
        <h1>Welcome to GaNIT School</h1>
        <p>
          Empowering the next generation of tech professionals through
          cutting-edge training and real-world learning experiences.
        </p>
        <Link to="/courses" className="btn">
          Explore Courses
        </Link>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <h2>Our Mission & Vision</h2>
        <p>
          GaNIT (Gravitas Academy for Next Gen Intelligence Training) is
          dedicated to providing top-tier education and skill-building to
          individuals aspiring to excel in the world of technology and innovation.
        </p>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="value-list">
          <div className="value-item">
            <h3>Innovation</h3>
            <p>
              We encourage creativity and embrace new technologies to keep our
              curriculum up-to-date.
            </p>
          </div>
          <div className="value-item">
            <h3>Excellence</h3>
            <p>
              Striving for excellence in both teaching and student outcomes is
              our priority.
            </p>
          </div>
          <div className="value-item">
            <h3>Support</h3>
            <p>
              We provide continuous mentorship and career support to our
              students.
            </p>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="expertise">
        <h2>Meet the Experts</h2>
        <div className="faculty-cards">
          {/* Add Faculty Members Here */}
          <div className="faculty-card">
            <img src="/assets/images/zeeshan1.jpg" alt="Zeeshan Patel" />
            <h3>Zeeshan Patel</h3>
            <p>CTO | Full Stack Instructor</p>
          </div>
          <div className="faculty-card">
            <img src="/assets/images/fahim.jpg" alt="Fahim Makandar" />
            <h3>Fahim Makandar</h3>
            <p>Founder | L&D Specialist</p>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="join-us">
        <h2>Join GaNIT School Today</h2>
        <p>
          Take the first step toward a successful career in tech by enrolling
          today.
        </p>
        <Link to="/about" className="btn">
          Join Now
        </Link>
      </section>
    </>
  )
}

export default About
