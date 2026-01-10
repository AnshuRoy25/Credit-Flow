import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Building2, CheckCircle } from 'lucide-react';
import Navbar from '../components/navbar.jsx';

const ResultPage = () => {
  const navigate = useNavigate();

  const handleDownloadCertificate = () => {
    window.alert('Downloading eligibility certificate...');
  };

  const handleFindPartnerBanks = () => {
    window.alert('Finding partner banks near you...');
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('loanFormData');
    navigate('/');
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
          background: linear-gradient(135deg, #2a4a2a, #1a3a1a);
          border-radius: 12px;
          border: 1px solid #4caf50;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .status-icon {
          width: 80px;
          height: 80px;
          background: #4caf50;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: white;
          margin: 0 auto 16px;
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
        }

        .result-status h2 {
          color: #4caf50;
          font-size: 24px;
          font-weight: 600;
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

          .status-icon {
            width: 60px;
            height: 60px;
            font-size: 36px;
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
        <div className="result-status">
          <CheckCircle size={60} color="#27ae60" />
          <h2>Application Approved!</h2>
        </div>

        <div className="next-steps">
          <h3>Next Steps:</h3>
          <ol>
            <li>Download eligibility certificate</li>
            <li>Find nearest partner bank</li>
            <li>Visit with required documents</li>
            <li>Bank verifies &amp; disburses funds</li>
          </ol>
        </div>

        <button className="action-btn" onClick={handleDownloadCertificate}>
          <Download size={18} style={{ marginRight: '8px' }} />
          Download Certificate
        </button>
        <button className="action-btn" onClick={handleFindPartnerBanks}>
          <Building2 size={18} style={{ marginRight: '8px' }} />
          Find Partner Banks
        </button>
      </div>

      <button className="home-btn" onClick={handleBackToHome}>
        BACK TO HOME
      </button>
    </div>
  );
};

export default ResultPage;
