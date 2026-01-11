import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { getApiUrl } from '../config/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
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
          margin-bottom: 40px;
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
          justify-content: center;
        }

        .form-title {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 32px;
          text-align: center;
        }

        .input-group {
          margin-bottom: 20px;
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
          color: #e0e0e0;
          font-size: 16px;
          transition: all 0.3s;
        }

        .input-group input:focus {
          outline: none;
          border-color: #e74c3c;
        }

        .input-group input::placeholder {
          color: #666;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aaa;
          cursor: pointer;
        }

        .remember-me input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #e74c3c;
        }

        .forgot-password {
          color: #e74c3c;
          text-decoration: none;
          cursor: pointer;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .error-message {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid #e74c3c;
          color: #e74c3c;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }

        .login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .login-btn:hover {
          box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
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

        .register-link {
          text-align: center;
          color: #aaa;
          font-size: 14px;
        }

        .register-link a {
          color: #e74c3c;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        .demo-credentials {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid #444;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .demo-credentials h4 {
          color: #e74c3c;
          font-size: 14px;
          margin-bottom: 12px;
          text-align: center;
        }

        .demo-credentials p {
          color: #aaa;
          font-size: 13px;
          margin: 4px 0;
          text-align: center;
        }

        .demo-credentials code {
          color: #e74c3c;
          background: #1a1a1a;
          padding: 2px 6px;
          border-radius: 4px;
        }

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="logo-section">
        <div className="logo">CREDIT FLOW</div>
        <div className="tagline">Your Financial Journey Starts Here</div>
      </div>

      <div className="form-container">
        <h2 className="form-title">Login</h2>

        {/* Demo Credentials Info */}
        <div className="demo-credentials">
          <h4>🔐 Demo Credentials</h4>
          <p>Username: <code>demo</code></p>
          <p>Password: <code>demo123</code></p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
                disabled={loading}
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
                placeholder="Enter password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a className="forgot-password">Forget password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="divider">OR</div>

        <div className="register-link">
          Don't have an account?{' '}
          <a onClick={() => navigate('/register')}>Create new account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;