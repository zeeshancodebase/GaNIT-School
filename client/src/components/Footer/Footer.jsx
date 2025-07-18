import React from 'react'

const Logo = () => (
  // <span className="logo">
  //   <FaGraduationCap /> GaNIT<span className="highlight">School</span>
  // </span>
  <div className="logo">
  {/* <FaGraduationCap className="logo-icon" /> */}
  <img src="/assets/images/logo7.png" alt="Logo" className="logo-image" />
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
            <p>&copy; 2025 GaNIT School. All rights reserved.</p>
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
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className='footer-contact'>
            <h4>Contact</h4>
            <p>
              Email: <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
            </p>
            <p>Phone: +91-9876543210</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
