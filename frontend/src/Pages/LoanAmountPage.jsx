import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';

const LoanAmountPage = () => {
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
    loanAmount: 20000,
    tenure: 6,
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
      [name]: Number(value),
    }));
  };

  const calculateEMI = () => {
    const rate = 0.12;
    const principal = Number(formData.loanAmount);
    const months = Number(formData.tenure);
    if (!principal || !months) return 0;

    const monthlyRate = rate / 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleBack = () => {
    navigate('/grant-permissions');
  };

  const handleNext = () => {
    sessionStorage.setItem('loanFormData', JSON.stringify(formData));
    navigate('/emi-start-date', { state: { formData } });
  };

  const emi = calculateEMI();

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

        .loan-calculator {
          flex: 1;
          margin-bottom: 24px;
        }

        .slider-group {
          margin-bottom: 32px;
        }

        .slider-group label {
          display: block;
          color: #aaa;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #888;
          font-size: 13px;
        }

        .slider {
          width: 100%;
          height: 6px;
          background: #333;
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s;
        }

        .slider::-webkit-slider-thumb:hover {
          background: #c0392b;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
        }

        .slider::-moz-range-thumb:hover {
          background: #c0392b;
        }

        .slider-value {
          text-align: center;
          margin-top: 12px;
          font-size: 20px;
          font-weight: bold;
          color: #e74c3c;
        }

        .info-box {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #444;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item span {
          color: #888;
          font-size: 13px;
        }

        .info-item strong {
          color: #e74c3c;
          font-size: 18px;
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
        <h3>CFL 5/7</h3>
        <h2>LOAN AMOUNT</h2>
      </div>

      <div className="loan-calculator">
        <div className="slider-group">
          <div className="slider-header">
            <span>20,000</span>
            <span>5,00,000</span>
          </div>
          <input
            type="range"
            name="loanAmount"
            min="20000"
            max="500000"
            step="1000"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="slider"
          />
          <div className="slider-value">
            ₹{Number(formData.loanAmount).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="slider-group">
          <label>TENURE</label>
          <div className="slider-header">
            <span>6</span>
            <span>60</span>
          </div>
          <input
            type="range"
            name="tenure"
            min="6"
            max="60"
            step="1"
            value={formData.tenure}
            onChange={handleInputChange}
            className="slider"
          />
          <div className="slider-value">{formData.tenure} months</div>
        </div>

        <div className="info-box">
          <div className="info-item">
            <span>BEST AVAILABLE RATE</span>
            <strong>12%</strong>
          </div>
          <div className="info-item">
            <span>EMI</span>
            <strong>₹{emi.toLocaleString('en-IN')}</strong>
          </div>
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

export default LoanAmountPage;
