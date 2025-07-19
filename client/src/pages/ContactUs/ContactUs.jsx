import React, { useState } from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import './ContactUs.css';
import Navbar from '../../components/Navbar/Navbar';

const ContactUs = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can connect to backend API here)
    console.log(formData);
    alert("Your message has been sent successfully!");
  };
  return (
  
    <>
    <Navbar/>
      {/* Hero Section */}
      <section id="contact" className="contact-hero">
        <h1>Get in Touch with GaNIT School</h1>
        <p>
          Whether you're looking for more information about our courses, have
          questions, or just want to connect, we're here to help. Feel free to
          reach out to us!
        </p>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Subject</option>
            <option value="Course Inquiry">Course Inquiry</option>
            <option value="General Question">General Question</option>
            <option value="Partnership">Partnership</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
          <input type="submit" value="Send Message" />
        </form>
      </section>

      {/* Contact Details Section */}
      <section className="contact-details">
        <div className="location">
          <h3>Our Location</h3>
          <p>
            123 Tech Avenue, Silicon Valley, California, USA
          </p>
        </div>
        <div className="social">
          <h3>Follow Us</h3>
          <Link to="#" aria-label="LinkedIn">
            <FaLinkedin />
          </Link>
          <Link to="#" aria-label="Twitter">
            <FaTwitter />
          </Link>
          <Link to="#" aria-label="Facebook">
            <FaFacebook />
          </Link>
        </div>
      </section>

      {/* Google Map */}
      <section id="map">
        <iframe
          title="GaNIT School Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.647574508298!2d-122.3994587846909!3d37.77492927975816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815dce5e3c99%3A0x3a59d8db8a655f8b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1625282255611!5m2!1sen!2sin"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </section>
    </>
  )
}

export default ContactUs;
