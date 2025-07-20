import React, { useState } from "react";
import "./LoginPage.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { ClipLoader } from "react-spinners";

const LoginPage = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("api/user/login", { email, password });
      const data = response.data;

      if (data?.token) {
        storeTokenInLS(data.token);
        toast.success(data.message);

        // ✅ Role-based navigation
        switch (data.user?.role) {
          case "admin":
            navigate("/super-admin");
            break;
          case "hr":
            navigate("/hr/home");
            break;
          default:
            navigate("/job-board");
            break;
        }
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
              type={showPassword ? "text" : "password"}
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

        <button type="submit" className="btn primary login-btn">
          {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
        </button>

        <div className="login-footer">
          <Link to="/resetPassword">Forgot password?</Link>
          <p>
            Don’t have an account? <Link to="/">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
