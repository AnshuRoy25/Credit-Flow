import React, { useState } from 'react';

const LoanApplicationPages = () => {
  const [currentPage, setCurrentPage] = useState('loanTypes');
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
    loanAmount: 20000,
    tenure: 6,
    permissionsGranted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateEMI = () => {
    const rate = 0.12;
    const principal = formData.loanAmount;
    const months = formData.tenure;
    const monthlyRate = rate / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  // Page Components
  const LoanTypesPage = () => (
    <div className="page">
      <div className="header">
        <button className="back-btn" onClick={() => setCurrentPage('loanTypes')}>←</button>
        <h2>Apply for a New Loan</h2>
      </div>
      <div className="loan-grid">
        <button className="loan-card active" onClick={() => setCurrentPage('personalLoan')}>
          PERSONAL
        </button>
        <button className="loan-card" onClick={() => alert('Coming soon')}>
          EDUCATIONAL
        </button>
        <button className="loan-card" onClick={() => alert('Coming soon')}>
          HOME
        </button>
        <button className="loan-card" onClick={() => alert('Coming soon')}>
          VEHICLE
        </button>
        <button className="loan-card" onClick={() => alert('Coming soon')}>
          BUSINESS
        </button>
      </div>
    </div>
  );

  const PersonalLoanPage = () => (
    <div className="page">
      <div className="header">
        <button className="back-btn" onClick={() => setCurrentPage('loanTypes')}>←</button>
        <h2>PERSONAL LOAN</h2>
      </div>
      <div className="tabs">
        <button className="tab active">FEATURES</button>
        <button className="tab">ELIGIBILITY</button>
        <button className="tab">DOCUMENTS</button>
        <button className="tab">SCHEME</button>
      </div>
      <div className="content-area">
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div>Quick approval within 24 hours</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div>Minimal documentation required</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div>Flexible repayment options</div>
          </div>
        </div>
      </div>
      <button className="primary-btn" onClick={() => setCurrentPage('confirmDetails')}>
        START A NEW APPLICATION
      </button>
    </div>
  );

  const ConfirmDetailsPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Confirm Your Details</h2>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>PAN Card Number</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            placeholder="ABCDE1234F"
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX"
            maxLength="12"
          />
        </div>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('personalLoan')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('contactDetails')}>NEXT</button>
      </div>
    </div>
  );

  const ContactDetailsPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Where can we reach you?</h2>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
        </div>
        <div className="form-group">
          <label>Current Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your current address"
            rows="4"
          />
        </div>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('confirmDetails')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('employmentDetails')}>NEXT</button>
      </div>
    </div>
  );

  const EmploymentDetailsPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Employment Details</h2>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label>Employment Type</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="business">Business Owner</option>
          </select>
        </div>
        
        <h3 className="section-title">Bank account details</h3>
        
        <div className="form-group">
          <label>Bank Account Number</label>
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleInputChange}
            placeholder="Enter account number"
          />
        </div>
        <div className="form-group">
          <label>Bank Name & Branch</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Enter bank name and branch"
          />
        </div>
        <div className="form-group">
          <label>IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleInputChange}
            placeholder="Enter IFSC code"
            maxLength="11"
          />
        </div>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('contactDetails')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('grantPermissions')}>NEXT</button>
      </div>
    </div>
  );

  const GrantPermissionsPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Grant Permissions</h2>
      </div>
      <div className="permissions-box">
        <div className="permission-item">Call Logs</div>
        <div className="permission-item">SMS</div>
        <div className="permission-item">Installed Apps</div>
        <div className="permission-item">Location</div>
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
        <button className="secondary-btn" onClick={() => setCurrentPage('employmentDetails')}>BACK</button>
        <button 
          className="primary-btn" 
          onClick={() => setCurrentPage('loanAmount')}
          disabled={!formData.permissionsGranted}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );

  const LoanAmountPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
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
          <div className="slider-value">₹{formData.loanAmount.toLocaleString()}</div>
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
            <strong>₹{calculateEMI()}</strong>
          </div>
        </div>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('grantPermissions')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('emiStartDate')}>NEXT</button>
      </div>
    </div>
  );

  const EMIStartDatePage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>EMI PAYMENT START DATE</h2>
      </div>
      <div className="date-display">
        <div className="large-date">24TH MARCH 2025</div>
        <p className="date-info">Your first EMI will be deducted on this date</p>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('loanAmount')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('reviewApplication')}>NEXT</button>
      </div>
    </div>
  );

  const ReviewApplicationPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Review Application</h2>
      </div>
      <div className="review-container">
        <div className="review-section">
          <h3>Personal Details</h3>
          <div className="review-item">
            <span>Name:</span>
            <strong>{formData.fullName || 'Not provided'}</strong>
          </div>
          <div className="review-item">
            <span>DOB:</span>
            <strong>{formData.dob || 'Not provided'}</strong>
          </div>
          <div className="review-item">
            <span>Gender:</span>
            <strong>{formData.gender || 'Not provided'}</strong>
          </div>
        </div>

        <div className="review-section">
          <h3>Loan Details</h3>
          <div className="review-item">
            <span>Amount:</span>
            <strong>₹{formData.loanAmount.toLocaleString()}</strong>
          </div>
          <div className="review-item">
            <span>Tenure:</span>
            <strong>{formData.tenure} months</strong>
          </div>
          <div className="review-item">
            <span>EMI:</span>
            <strong>₹{calculateEMI()}</strong>
          </div>
        </div>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('emiStartDate')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('processing')}>Submit & Analyze</button>
      </div>
    </div>
  );

  const ProcessingPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>Processing</h2>
      </div>
      <div className="processing-container">
        <div className="spinner"></div>
        <p>Analyzing your application...</p>
        <p className="processing-note">This may take a few moments</p>
      </div>
      <div className="nav-buttons">
        <button className="secondary-btn" onClick={() => setCurrentPage('reviewApplication')}>BACK</button>
        <button className="primary-btn" onClick={() => setCurrentPage('result')}>Submit & Analyze</button>
      </div>
    </div>
  );

  const ResultPage = () => (
    <div className="page">
      <div className="header-simple">
        <h3>CFL X/Y</h3>
        <h2>RESULT</h2>
      </div>
      <div className="result-container">
        <div className="result-status success">
          <div className="status-icon">✓</div>
          <h2>Application Approved!</h2>
        </div>
        
        <div className="next-steps">
          <h3>Next Steps:</h3>
          <ol>
            <li>Download eligibility certificate</li>
            <li>Find nearest partner bank</li>
            <li>Visit with documents</li>
            <li>Bank verifies & disburses</li>
          </ol>
        </div>

        <button className="action-btn" onClick={() => alert('Downloading certificate...')}>
          Download Certificate
        </button>
        <button className="action-btn" onClick={() => alert('Finding partner banks...')}>
          Find Partner Banks
        </button>
      </div>
      <button className="home-btn" onClick={() => setCurrentPage('loanTypes')}>
        BACK TO HOME
      </button>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'loanTypes': return <LoanTypesPage />;
      case 'personalLoan': return <PersonalLoanPage />;
      case 'confirmDetails': return <ConfirmDetailsPage />;
      case 'contactDetails': return <ContactDetailsPage />;
      case 'employmentDetails': return <EmploymentDetailsPage />;
      case 'grantPermissions': return <GrantPermissionsPage />;
      case 'loanAmount': return <LoanAmountPage />;
      case 'emiStartDate': return <EMIStartDatePage />;
      case 'reviewApplication': return <ReviewApplicationPage />;
      case 'processing': return <ProcessingPage />;
      case 'result': return <ResultPage />;
      default: return <LoanTypesPage />;
    }
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: #1a1a1a;
          color: #e0e0e0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 20px;
        }

        .page {
          max-width: 480px;
          margin: 0 auto;
          background: #2a2a2a;
          border-radius: 20px;
          padding: 24px;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          border: 1px solid #3a3a3a;
        }

        .header {
          margin-bottom: 24px;
        }

        .header h2 {
          font-size: 24px;
          margin-top: 12px;
          color: #ffffff;
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

        .back-btn {
          background: transparent;
          border: none;
          color: #e74c3c;
          font-size: 24px;
          cursor: pointer;
          padding: 4px 8px;
          margin-bottom: 8px;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        .loan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .loan-card {
          background: #333;
          border: 2px solid #444;
          border-radius: 12px;
          padding: 32px 16px;
          color: #e0e0e0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .loan-card:hover {
          border-color: #e74c3c;
          background: #3a3a3a;
        }

        .loan-card.active {
          border-color: #e74c3c;
          background: #3a3a3a;
        }

        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid #444;
          padding-bottom: 12px;
        }

        .tab {
          background: transparent;
          border: none;
          color: #888;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: color 0.3s;
        }

        .tab.active {
          color: #e74c3c;
          border-bottom: 2px solid #e74c3c;
        }

        .content-area {
          flex: 1;
          margin-bottom: 24px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #333;
          border-radius: 8px;
        }

        .feature-icon {
          width: 32px;
          height: 32px;
          background: #e74c3c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
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
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #444;
          border-radius: 8px;
          color: #e0e0e0;
          font-size: 14px;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #e74c3c;
        }

        .section-title {
          color: #e0e0e0;
          font-size: 16px;
          margin: 24px 0 16px;
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
        }

        .terms-section {
          margin-bottom: 24px;
        }

        .terms-section h3 {
          font-size: 14px;
          margin-bottom: 12px;
          color: #aaa;
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

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .checkbox-label span {
          color: #e0e0e0;
          font-size: 14px;
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
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border-radius: 50%;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border-radius: 50%;
          cursor: pointer;
          border: none;
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

        .date-display {
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .large-date {
          font-size: 28px;
          font-weight: bold;
          color: #e74c3c;
          margin-bottom: 16px;
        }

        .date-info {
          color: #888;
          font-size: 14px;
        }

        .review-container {
          flex: 1;
          margin-bottom: 24px;
        }

        .review-section {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .review-section h3 {
          color: #e74c3c;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .review-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #444;
        }

        .review-item:last-child {
          border-bottom: none;
        }

        .review-item span {
          color: #888;
        }

        .review-item strong {
          color: #e0e0e0;
        }

        .processing-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #333;
          border-top: 4px solid #e74c3c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .processing-note {
          color: #888;
          font-size: 13px;
        }

        .result-container {
          flex: 1;
        }

        .result-status {
          text-align: center;
          padding: 32px;
          margin-bottom: 24px;
        }

        .result-status.success {
          background: linear-gradient(135deg, #2a4a2a, #1a3a1a);
          border-radius: 12px;
        }

        .status-icon {
          width: 80px;
          height: 80px;
          background: #4CAF50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: white;
          margin: 0 auto 16px;
        }

        .result-status h2 {
          color: #4CAF50;
          font-size: 24px;
        }

        .next-steps {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .next-steps h3 {
          color: #e74c3c;
          margin-bottom: 16px;
        }

        .next-steps ol {
          margin-left: 20px;
          color: #ccc;
        }

        .next-steps li {
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .action-btn {
          width: 100%;
          padding: 14px;
          background: #333;
          border: 2px solid #e74c3c;
          border-radius: 8px;
          color: #e74c3c;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.3s;
        }

        .action-btn:hover {
          background: #e74c3c;
          color: white;
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

        .home-btn {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 2px solid #444;
          border-radius: 8px;
          color: #e0e0e0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 12px;
        }

        .home-btn:hover {
          border-color: #e74c3c;
          background: #333;
        }

        @media (max-width: 480px) {
          .app-container {
            padding: 0;
          }

          .page {
            border-radius: 0;
            min-height: 100vh;
          }

          .loan-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {renderPage()}
    </div>
  );
};

export default LoanApplicationPages;