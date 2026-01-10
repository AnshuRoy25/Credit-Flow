import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Building2, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/navbar.jsx';

const ResultPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Get result from sessionStorage
    const storedResult = sessionStorage.getItem('loanResult');
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
    } else {
      // If no result, redirect back
      navigate('/home');
    }
  }, [navigate]);

  const handleDownloadCertificate = () => {
    if (result?.application?.status === 'APPROVED') {
      window.alert('Downloading eligibility certificate...');
    } else {
      window.alert('Certificate only available for approved applications.');
    }
  };

  const handleFindPartnerBanks = () => {
    window.alert('Finding partner banks near you...');
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('loanFormData');
    sessionStorage.removeItem('loanResult');
    navigate('/home');
  };

  if (!result) {
    return null;
  }

  const isApproved = result.application?.status === 'APPROVED';
  const creditScore = result.application?.creditScore || 0;
  const loanAmount = result.application?.loanAmount || 0;
  const approvedAmount = result.application?.approvedAmount || 0;
  const interestRate = result.application?.interestRate || 0;
  const tenure = result.application?.tenure || 0;
  const emi = result.application?.emi || 0;

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

        .result-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .result-status {
          text-align: center;
          padding: 32px;
          margin-bottom: 24px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .result-status.approved {
          background: linear-gradient(135deg, #2a4a2a, #1a3a1a);
          border-color: #4caf50;
        }

        .result-status.declined {
          background: linear-gradient(135deg, #4a2a2a, #3a1a1a);
          border-color: #e74c3c;
        }

        .result-status h2 {
          font-size: 24px;
          font-weight: 600;
          margin-top: 12px;
        }

        .result-status.approved h2 {
          color: #4caf50;
        }

        .result-status.declined h2 {
          color: #e74c3c;
        }

        .credit-score-badge {
          background: #333;
          border: 2px solid;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 16px auto;
        }

        .credit-score-badge.high {
          border-color: #4caf50;
        }

        .credit-score-badge.medium {
          border-color: #ff9800;
        }

        .credit-score-badge.low {
          border-color: #e74c3c;
        }

        .score-number {
          font-size: 32px;
          font-weight: 700;
        }

        .score-label {
          font-size: 12px;
          color: #888;
        }

        .loan-details {
          background: #333;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .loan-details h3 {
          color: #e74c3c;
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 600;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #444;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-row span {
          color: #888;
          font-size: 14px;
        }

        .detail-row strong {
          color: #e0e0e0;
          font-size: 14px;
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
          font-size: 16px;
          font-weight: 600;
        }

        .next-steps ol {
          margin-left: 20px;
          color: #ccc;
          font-size: 14px;
        }

        .next-steps li {
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .next-steps p {
          color: #aaa;
          font-size: 14px;
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
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .action-btn:hover {
          background: #e74c3c;
          color: white;
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
          font-size: 14px;
        }

        .home-btn:hover {
          border-color: #e74c3c;
          background: #333;
        }

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }

          .result-status {
            padding: 24px;
          }

          .result-status h2 {
            font-size: 20px;
          }
        }
      `}</style>

      <Navbar />

      <div className="header-simple">
        <h3>CFL</h3>
        <h2>RESULT</h2>
      </div>

      <div className="result-container">
        <div className={`result-status ${isApproved ? 'approved' : 'declined'}`}>
          {isApproved ? (
            <CheckCircle size={60} color="#27ae60" />
          ) : (
            <XCircle size={60} color="#e74c3c" />
          )}
          <h2>{isApproved ? 'Application Approved!' : 'Application Declined'}</h2>
          
          <div className={`credit-score-badge ${creditScore >= 70 ? 'high' : creditScore >= 50 ? 'medium' : 'low'}`}>
            <div className="score-number">{creditScore}</div>
            <div className="score-label">Credit Score</div>
          </div>
        </div>

        <div className="loan-details">
          <h3>Loan Details</h3>
          <div className="detail-row">
            <span>Requested Amount:</span>
            <strong>₹{loanAmount.toLocaleString('en-IN')}</strong>
          </div>
          {isApproved && (
            <>
              <div className="detail-row">
                <span>Approved Amount:</span>
                <strong>₹{approvedAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="detail-row">
                <span>Interest Rate:</span>
                <strong>{interestRate}% p.a.</strong>
              </div>
              <div className="detail-row">
                <span>Tenure:</span>
                <strong>{tenure} months</strong>
              </div>
              <div className="detail-row">
                <span>Monthly EMI:</span>
                <strong>₹{emi.toLocaleString('en-IN')}</strong>
              </div>
            </>
          )}
        </div>

        {isApproved ? (
          <>
            <div className="next-steps">
              <h3>Next Steps:</h3>
              <ol>
                <li>Download your eligibility certificate</li>
                <li>Find nearest partner bank</li>
                <li>Visit with required documents</li>
                <li>Bank verifies &amp; disburses funds</li>
              </ol>
            </div>

            <button className="action-btn" onClick={handleDownloadCertificate}>
              <Download size={18} />
              Download Certificate
            </button>
            <button className="action-btn" onClick={handleFindPartnerBanks}>
              <Building2 size={18} />
              Find Partner Banks
            </button>
          </>
        ) : (
          <div className="next-steps">
            <h3>Why was my application declined?</h3>
            <p>
              Your application was declined due to a low credit score ({creditScore}/100). 
              To improve your chances in the future:
            </p>
            <ol>
              <li>Maintain regular communication patterns</li>
              <li>Ensure stable location history</li>
              <li>Keep financial apps active</li>
              <li>Pay bills and EMIs on time</li>
            </ol>
          </div>
        )}
      </div>

      <button className="home-btn" onClick={handleBackToHome}>
        BACK TO HOME
      </button>
    </div>
  );
};

export default ResultPage;