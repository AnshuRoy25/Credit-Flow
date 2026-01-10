import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Package, MapPin } from 'lucide-react';
import Navbar from '../components/navbar.jsx';

const GrantPermissionsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    pan: '',
    aadhaar: '',
    mobile: '',
    email: '',
    address: '',
    employmentType: '',
    bankAccount: '',
    bankName: '',
    ifsc: '',
    permissionsGranted: false,
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem('loanFormData');
    if (savedData) {
      setFormData((prev) => ({
        ...prev,
        ...JSON.parse(savedData),
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleBack = () => {
    navigate('/employment-details');
  };

  const handleConfirm = () => {
    if (!formData.permissionsGranted) {
      window.alert('Please agree to the terms and conditions to continue.');
      return;
    }
    sessionStorage.setItem('loanFormData', JSON.stringify(formData));
    navigate('/loan-amount', { state: { formData } });
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

        .header-simple {
          margin-bottom: 24px;
        }

        .header-simple h3 {
          color: #888;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .header-simple h2 {
          font-size: 20px;
          color: #ffffff;
        }

        .permissions-box {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .permission-item {
          padding: 12px;
          margin-bottom: 8px;
          background: #2a2a2a;
          border-radius: 6px;
          color: #e0e0e0;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .permission-item:last-child {
          margin-bottom: 0;
        }

        .terms-section {
          margin-bottom: 24px;
          flex: 1;
        }

        .terms-section h3 {
          font-size: 14px;
          margin-bottom: 12px;
          color: #aaa;
          font-weight: 600;
        }

        .terms-box {
          background: #333;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          max-height: 200px;
          overflow-y: auto;
        }

        .terms-box p {
          margin-bottom: 12px;
          color: #ccc;
          font-size: 13px;
        }

        .terms-box ul {
          margin-left: 20px;
          color: #ccc;
          font-size: 13px;
        }

        .terms-box li {
          margin-bottom: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .checkbox-label input[type='checkbox'] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #e74c3c;
        }

        .checkbox-label span {
          color: #e0e0e0;
          font-size: 14px;
        }

        .nav-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .primary-btn {
          width: 100%;
          padding: 14px;
          background: #e74c3c;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }

        .primary-btn:hover {
          background: #c0392b;
        }

        .primary-btn:disabled {
          background: #666;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .secondary-btn {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 2px solid #444;
          border-radius: 8px;
          color: #e0e0e0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }

        .secondary-btn:hover {
          border-color: #e74c3c;
          background: #333;
        }

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }
        }
      `}</style>

      <Navbar />

      <div className="header-simple">
        <h3>CFL 4/7</h3>
        <h2>Grant Permissions</h2>
      </div>

      <div className="permissions-box">
        <div className="permission-item">
          <Phone size={20} color="#e74c3c" />
          Call Logs
        </div>
        <div className="permission-item">
          <MessageSquare size={20} color="#e74c3c" />
          SMS
        </div>
        <div className="permission-item">
          <Package size={20} color="#e74c3c" />
          Installed Apps
        </div>
        <div className="permission-item">
          <MapPin size={20} color="#e74c3c" />
          Location
        </div>
      </div>

      <div className="terms-section">
        <h3>TERMS AND CONDITIONS</h3>
        <div className="terms-box">
          <p>By proceeding, you agree to:</p>
          <ul>
            <li>Share the requested device permissions</li>
            <li>Our terms of service and privacy policy</li>
            <li>Credit bureau checks and verification</li>
            <li>Communication via SMS, email, and phone</li>
          </ul>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="permissionsGranted"
            checked={formData.permissionsGranted}
            onChange={handleInputChange}
          />
          <span>I agree to terms and conditions</span>
        </label>
      </div>

      <div className="nav-buttons">
        <button className="secondary-btn" onClick={handleBack}>
          BACK
        </button>
        <button
          className="primary-btn"
          onClick={handleConfirm}
          disabled={!formData.permissionsGranted}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default GrantPermissionsPage;
