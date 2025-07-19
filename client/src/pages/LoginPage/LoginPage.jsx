import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add validation/auth logic
    console.log('Login data', formData);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtext">Login to continue your learning journey</p>

        <div className="input-group">
          <label>
            <FaUser />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            <FaLock />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={togglePassword} className="toggle-password">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
        </div>

        <button type="submit" className="btn primary login-btn">Login</button>

        <div className="login-footer">
          <Link to="/">Forgot password?</Link>
          <p>Don’t have an account? <Link to="/">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
