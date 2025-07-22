import React from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './FacultyProfile.css'; // Import the custom CSS for the profile page

// Faculty data
// const faculty = {
//   name: "Dr. John Doe",
//   role: "Associate Professor of Computer Science",
//   description:
//     "Dr. John Doe is a leading expert in artificial intelligence and machine learning. With over 15 years of academic experience, he has authored numerous publications and is passionate about educating the next generation of computer scientists.",
//   photo: "/assets/images/john_doe.jpg", // Replace with actual image URL
//   expertise: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Natural Language Processing"],
//   socialLinks: {
//     linkedin: "https://linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//     email: "mailto:john.doe@university.edu"
//   }
// };

const faculty = {
  name: "Fahim Makandar",
  role: "Founder & CEO – GaNIT School",
  description1: 
    "An accomplished leader with extensive experience in training and development, dedicated to empowering students and professionals through impactful education. Has successfully trained thousands of students in placements and competitive exams, with deep expertise in Advanced Quantitative Aptitude, and mentored hundreds of professionals in skill enhancement and career development.",
  description2: "Focused on bridging the gap between education and employability, leading GaNIT School towards innovation in EdTech, delivering industry-ready technical programs, aptitude mastery, and comprehensive placement support. Committed to creating a future-ready workforce through quality learning and strategic guidance.",
    photo: "/assets/images/fahim.jpg",  // Replace with actual image URL
  expertise: ["Aptitude", "Logical Reasoning", "Soft Skills"],
  socialLinks: {
    linkedin: "https://linkedin.com/in/fahimmakandar",
    github: "https://github.com/fahimmakandar",
    email: "mailto:fahim@ganitschool.com"
  }
};

const FacultyProfile = () => {
  return (
    <motion.div
      className="faculty-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="faculty-profile-wrapper">
        
        {/* Hero Section with Faculty Image */}
        <section className="hero-section">
          

          {/* Faculty Info */}
          <div className="faculty-info-section">
            <h1 className="faculty-name">{faculty.name}</h1>
            <p className="faculty-role">{faculty.role}</p>
            <p className="faculty-description">{faculty.description1}</p>
            <p className="faculty-description">{faculty.description2}</p>

            {/* Expertise Section */}
            {/* <div className="faculty-expertise">
              <h3>Expertise</h3>
              <ul>
                {faculty.expertise.map((skill, index) => (
                  <li key={index} className="expertise-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Social Media Links */}
            {/* <div className="faculty-socials">
              <a href={faculty.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href={faculty.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
              <a href={faculty.socialLinks.email} target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaEnvelope />
              </a>
            </div> */}
          </div><div className="hero-image-section">
            <img src={faculty.photo} alt={faculty.name} className="faculty-photo" />
          </div>
        </section>

        {/* Contact Info Section */}
        <section id="contact" className="contact-info">
          <div className="contact-box">
            <h3>Contact Information</h3>
            <ul>
              <li><strong>Email:</strong> {faculty.socialLinks.email}</li>
              <li><strong>Phone:</strong> (123) 456-7890</li>
              <li><strong>Office:</strong> Room 204, CS Building</li>
            </ul>
          </div>
        </section>

        {/* Academic Contributions Section */}
        <section className="contributions">
          <h3>Academic Contributions</h3>
          <div className="contributions-list">
            <div className="contribution-card">
              <h4>Published Works</h4>
              <p>Published 20+ papers in top-tier conferences and journals</p>
            </div>
            <div className="contribution-card">
              <h4>Speaker</h4>
              <p>Speaker at various AI and Machine Learning conferences worldwide</p>
            </div>
            <div className="contribution-card">
              <h4>Research Collaboration</h4>
              <p>Contributor to multiple AI research projects</p>
            </div>
          </div>
        </section>

        {/* Research Interests Section */}
        <section className="research-interests">
          <h3>Research Interests</h3>
          <ul className="interest-list">
            <li>Artificial Intelligence & Machine Learning</li>
            <li>Deep Learning & Neural Networks</li>
            <li>Natural Language Processing</li>
          </ul>
        </section>
      </div>
    </motion.div>
  );
};

export default FacultyProfile;
