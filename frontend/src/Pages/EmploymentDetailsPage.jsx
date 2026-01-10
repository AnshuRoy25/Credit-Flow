import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';

const EmploymentDetailsPage = () => {
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate('/contact-details');
  };

  const handleNext = () => {
    if (!formData.employmentType || !formData.bankAccount || !formData.bankName || !formData.ifsc) {
      window.alert('Please fill in all required fields');
      return;
    }
    sessionStorage.setItem('loanFormData', JSON.stringify(formData));
    navigate('/grant-permissions', { state: { formData } });
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

        .form-container {
          flex: 1;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #aaa;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #444;
          border-radius: 8px;
          color: #e0e0e0;
          font-size: 14px;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #e74c3c;
        }

        .section-title {
          color: #e0e0e0;
          font-size: 16px;
          margin: 24px 0 16px;
          font-weight: 600;
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
        <h3>CFL 3/7</h3>
        <h2>Employment Details</h2>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label>Employment Type *</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="business">Business Owner</option>
          </select>
        </div>

        <h3 className="section-title">Bank account details</h3>

        <div className="form-group">
          <label>Bank Account Number *</label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleInputChange}
            placeholder="Enter account number"
          />
        </div>

        <div className="form-group">
          <label>Bank Name & Branch *</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Enter bank name and branch"
          />
        </div>

        <div className="form-group">
          <label>IFSC Code *</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleInputChange}
            placeholder="Enter IFSC code"
            maxLength={11}
          />
        </div>
      </div>

      <div className="nav-buttons">
        <button className="secondary-btn" onClick={handleBack}>
          BACK
        </button>
        <button className="primary-btn" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default EmploymentDetailsPage;
