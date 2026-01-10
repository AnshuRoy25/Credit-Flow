import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration is disabled for MVP
    window.alert('Registration is currently disabled for this MVP demo. Please use the demo credentials to login.');
  };

  return (
    <div className="page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          background: #1a1a1a;
        }

        .page {
          max-width: 480px;
          margin: 0 auto;
          background: #2a2a2a;
          border-radius: 20px;
          padding: 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          border: 1px solid #3a3a3a;
          color: #e0e0e0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: #e74c3c;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        .logo-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo {
          font-size: 32px;
          font-weight: 700;
          color: #e74c3c;
          margin-bottom: 8px;
        }

        .tagline {
          color: #888;
          font-size: 14px;
        }

        .form-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 24px;
          text-align: center;
        }

        .mvp-notice {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid #e74c3c;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
        }

        .mvp-notice h4 {
          color: #e74c3c;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .mvp-notice p {
          color: #aaa;
          font-size: 13px;
          line-height: 1.5;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #888;
        }

        .input-group input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: #1a1a1a;
          border: 2px solid #444;
          border-radius: 12px;
          color: #666;
          font-size: 16px;
          transition: all 0.3s;
        }

        .input-group input:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .input-group input::placeholder {
          color: #555;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 20px 0;
          font-size: 13px;
          color: #aaa;
        }

        .terms-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .terms-checkbox a {
          color: #e74c3c;
          text-decoration: none;
        }

        .register-btn {
          width: 100%;
          padding: 16px;
          background: #666;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: not-allowed;
          font-size: 16px;
          margin-bottom: 20px;
          opacity: 0.6;
        }

        .divider {
          text-align: center;
          margin: 20px 0;
          color: #666;
          font-size: 14px;
          position: relative;
        }

        .divider::before,
        .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: #444;
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        .login-link {
          text-align: center;
          color: #aaa;
          font-size: 14px;
        }

        .login-link a {
          color: #e74c3c;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate('/login')}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="logo-section">
        <div className="logo">CREDIT FLOW</div>
        <div className="tagline">Your Financial Journey Starts Here</div>
      </div>

      <div className="form-container">
        <h2 className="form-title">Create new account</h2>

        <div className="mvp-notice">
          <h4>⚠️ MVP Demo Mode</h4>
          <p>
            Registration is currently disabled for this demo. 
            Please use the demo credentials on the login page to explore the application.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                disabled
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                disabled
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                disabled
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                disabled
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter Password"
                disabled
              />
            </div>
          </div>

          <label className="terms-checkbox">
            <input type="checkbox" disabled />
            <span>
              I agree to the <a href="#">Terms and Conditions</a> and{' '}
              <a href="#">Privacy Policy</a>
            </span>
          </label>

          <button type="submit" className="register-btn" disabled>
            CREATE ACCOUNT (DISABLED)
          </button>
        </form>

        <div className="divider">OR</div>

        <div className="login-link">
          Already have an account?{' '}
          <a onClick={() => navigate('/login')}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;