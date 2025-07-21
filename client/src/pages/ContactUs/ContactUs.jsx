import React, { useState } from "react";
import { FaLinkedin} from "react-icons/fa";
import { Link } from "react-router-dom";
import './ContactUs.css';
import Navbar from '../../components/Navbar/Navbar';
import { FaInstagram } from "react-icons/fa6";

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
        {/* <div className="location">
          <h3>Our Location</h3>
          <p>
            123 Tech Avenue, Silicon Valley, California, USA
          </p>
        </div> */}
        <div className="social">
          <h3>Follow Us</h3>
          <Link to="https://www.linkedin.com/company/ganit-school/" aria-label="LinkedIn">
            <FaLinkedin />
          </Link>
          <Link to="https://www.instagram.com/ganitschool/" aria-label="Instagram">
            <FaInstagram />
          </Link>
          {/* <Link to="/" aria-label="Facebook">
            <FaFacebook />
          </Link> */}
        </div>
      </section>

    </>
  )
}

export default ContactUs;
