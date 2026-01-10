import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Briefcase, DollarSign, TrendingUp, Home, Link2, Gem, Zap, Star, CheckCircle } from 'lucide-react';
import Navbar from '../components/navbar.jsx';

const PersonalLoanPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('features');

  const handleBack = () => {
    navigate('/');
  };

  const handleStartApplication = () => {
    navigate('/confirm-details');
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

        .header {
          margin-bottom: 24px;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: #e74c3c;
          font-size: 24px;
          cursor: pointer;
          padding: 4px 8px;
          margin-bottom: -14px;
        }

        .button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.6);
        }

        .tab:focus-visible {
          outline: none;
          box-shadow: none;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        .header h2 {
          font-size: 24px;
          margin-top: 12px;
          color: #ffffff;
        }

        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid #444;
          padding-bottom: 12px;
          overflow-x: auto;
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
          white-space: nowrap;
          outline: none;
        }

        .tab:focus {
          outline: none;
          box-shadow: none;
        }

        .tab.active {
          color: #e74c3c;
          border-bottom: 2px solid #e74c3c;
        }

        .content-area {
          flex: 1;
          margin-bottom: 24px;
          overflow-y: auto;
          max-height: 540px;
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
          flex-shrink: 0;
          display: none;
        }

        .eligibility-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .eligibility-item {
          background: #333;
          border-left: 4px solid #e74c3c;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .eligibility-item h4 {
          color: #e74c3c;
          margin-bottom: 8px;
          font-size: 14px;
          margin: 0 0 8px 0;
        }

        .eligibility-item p {
          color: #ccc;
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }

        .documents-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .document-item {
          background: #333;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #444;
        }

        .document-icon {
          width: 32px;
          height: 32px;
          background: #e74c3c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          font-weight: bold;
          font-size: 14px;
        }

        .document-info {
          flex: 1;
        }

        .document-info h4 {
          color: #e0e0e0;
          font-size: 14px;
          margin-bottom: 4px;
          margin: 0 0 4px 0;
        }

        .document-info p {
          color: #888;
          font-size: 12px;
          margin: 0;
        }

        .scheme-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .scheme-card {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 16px;
        }

        .scheme-card h4 {
          color: #e74c3c;
          margin-bottom: 8px;
          font-size: 14px;
          margin: 0 0 8px 0;
        }

        .scheme-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .scheme-detail {
          background: #2a2a2a;
          padding: 8px 12px;
          border-radius: 6px;
          text-align: center;
        }

        .scheme-detail-label {
          color: #888;
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
        }

        .scheme-detail-value {
          color: #e74c3c;
          font-size: 14px;
          font-weight: 600;
        }

        .scheme-card p {
          color: #ccc;
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
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

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }

          .content-area {
            max-height: 350px;
          }
        }
      `}</style>

      <Navbar />

      <div className="header">
        <button className="back-btn" onClick={handleBack} aria-label="Back">
        <ArrowLeft size={20} />
        </button>
        <h2>PERSONAL LOAN</h2>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          FEATURES
        </button>
        <button
          className={`tab ${activeTab === 'eligibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('eligibility')}
        >
          ELIGIBILITY
        </button>
        <button
          className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          DOCUMENTS
        </button>
        <button
          className={`tab ${activeTab === 'scheme' ? 'active' : ''}`}
          onClick={() => setActiveTab('scheme')}
        >
          SCHEME
        </button>
      </div>

      <div className="content-area">
        {/* FEATURES TAB */}
        {activeTab === 'features' && (
          <div className="features-list">
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>Quick approval within 24 hours</div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>Minimal documentation required</div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>Flexible repayment options</div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>Low interest rates starting at 12% p.a.</div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>No collateral or guarantor required</div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>Instant disbursal to your account</div>
            </div>
          </div>
        )}

        {/* ELIGIBILITY TAB */}
        {activeTab === 'eligibility' && (
          <div className="eligibility-list">
            <div className="eligibility-item">
              <FileText size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Age Requirement</h4>
                <p>Must be between 21 to 60 years old at the time of loan application</p>
              </div>
            </div>
            <div className="eligibility-item">
              <Briefcase size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Employment Status</h4>
                <p>Should be employed (Salaried, Self-employed, or Business Owner) with minimum 2 years of income stability</p>
              </div>
            </div>
            <div className="eligibility-item">
              <DollarSign size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Monthly Income</h4>
                <p>Minimum monthly income of ₹15,000. Loan amount should not exceed 10x of monthly income</p>
              </div>
            </div>
            <div className="eligibility-item">
              <TrendingUp size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Credit Score</h4>
                <p>A good credit score of 750+ is preferred, but we can consider scores above 650</p>
              </div>
            </div>
            <div className="eligibility-item">
              <Home size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Residence</h4>
                <p>Should be a resident of India with a valid address proof</p>
              </div>
            </div>
            <div className="eligibility-item">
              <Link2 size={20} color="#e74c3c" style={{ flexShrink: 0 }} />
              <div>
                <h4>Bank Account</h4>
                <p>Must have an active bank account for salary credit and EMI deduction</p>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="documents-list">
            <div className="document-item">
              <div className="document-icon">1</div>
              <div className="document-info">
                <h4>PAN Card</h4>
                <p>Permanent Account Number issued by IT Department</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">2</div>
              <div className="document-info">
                <h4>Aadhaar Card</h4>
                <p>12-digit unique identification number</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">3</div>
              <div className="document-info">
                <h4>Address Proof</h4>
                <p>Utility bill, rental agreement, or voter ID</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">4</div>
              <div className="document-info">
                <h4>Bank Statement</h4>
                <p>Last 6 months to verify income and stability</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">5</div>
              <div className="document-info">
                <h4>Salary Slips</h4>
                <p>Last 2 salary slips for employment verification</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">6</div>
              <div className="document-info">
                <h4>ITR/Form 16</h4>
                <p>Last 2 years income tax return or Form 16</p>
              </div>
            </div>
            <div className="document-item">
              <div className="document-icon">7</div>
              <div className="document-info">
                <h4>Selfie</h4>
                <p>Recent clear photo for identity verification</p>
              </div>
            </div>
          </div>
        )}

        {/* SCHEME TAB */}
        {activeTab === 'scheme' && (
          <div className="scheme-list">
            <div className="scheme-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Gem size={20} color="#e74c3c" />
                <h4 style={{ margin: 0 }}>Standard Scheme</h4>
              </div>
              <div className="scheme-details">
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Interest Rate</span>
                  <span className="scheme-detail-value">12% p.a.</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Loan Amount</span>
                  <span className="scheme-detail-value">₹20K - ₹5L</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Tenure</span>
                  <span className="scheme-detail-value">6 - 60 months</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Processing Fee</span>
                  <span className="scheme-detail-value">1.5%</span>
                </div>
              </div>
              <p>Our most popular scheme with flexible terms and quick approval.</p>
            </div>

            <div className="scheme-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Zap size={20} color="#e74c3c" />
                <h4 style={{ margin: 0 }}>Accelerated Scheme</h4>
              </div>
              <div className="scheme-details">
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Interest Rate</span>
                  <span className="scheme-detail-value">11.5% p.a.</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Loan Amount</span>
                  <span className="scheme-detail-value">₹50K - ₹10L</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Tenure</span>
                  <span className="scheme-detail-value">6 - 60 months</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Processing Fee</span>
                  <span className="scheme-detail-value">1%</span>
                </div>
              </div>
              <p>For higher loan amounts with slightly lower interest rates and expedited processing.</p>
            </div>

            <div className="scheme-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Star size={20} color="#e74c3c" />
                <h4 style={{ margin: 0 }}>Premium Scheme</h4>
              </div>
              <div className="scheme-details">
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Interest Rate</span>
                  <span className="scheme-detail-value">11% p.a.</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Loan Amount</span>
                  <span className="scheme-detail-value">₹1L - ₹20L</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Tenure</span>
                  <span className="scheme-detail-value">12 - 60 months</span>
                </div>
                <div className="scheme-detail">
                  <span className="scheme-detail-label">Processing Fee</span>
                  <span className="scheme-detail-value">0.75%</span>
                </div>
              </div>
              <p>Exclusive scheme for high-income individuals with lowest interest rates and additional benefits.</p>
            </div>
          </div>
        )}
      </div>

      <button className="primary-btn" onClick={handleStartApplication}>
        START A NEW APPLICATION
      </button>
    </div>
  );
};

export default PersonalLoanPage;
