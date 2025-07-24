import React from 'react'
import { FaEnvelope, FaInstagram, FaLinkedin } from 'react-icons/fa';
import {FaPhone } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Logo = () => (
  // <span className="logo">
  //   <FaGraduationCap /> GaNIT<span className="highlight">School</span>
  // </span>
  <div className="logo">
  {/* <FaGraduationCap className="logo-icon" /> */}
  <img src="/assets/images/logo10.png" alt="Logo" className="logo-image" />
  <div className="logo-text">
    <span className="logo-ganit">GANIT</span>
    <span className="logo-school">School</span>
  </div>
</div>

);

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer id="contact" className="home-footer">
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>&copy; 2025 GANIT School. All rights reserved.</p>
          </div>
          <div className="footer-links">
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
                <a href="/contact-us">Contact</a>
              </li>
            </ul>
          </div>
          <div className='footer-contact'>
            <h4>Follow us on</h4>
            <p>
              <FaLinkedin/> <a href="https://www.linkedin.com/company/ganit-school">/ganit-school</a>
            </p>
            <p><FaInstagram/> <Link to="https://www.instagram.com/ganitschool">/ganitschool</Link></p>
          </div>
          <div className='footer-contact'>
            <h4>Contact</h4>
            <p>
              <FaEnvelope/> <a href="mailto:gravitasacademy.india@gmail.com">gravitasacademy.india@gmail.com</a>
            </p>
            <p> <FaPhone/> +91-6361366236</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
