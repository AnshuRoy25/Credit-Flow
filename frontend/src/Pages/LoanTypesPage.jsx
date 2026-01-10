import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';

const LoanTypesPage = () => {
  const navigate = useNavigate();

  const handleSelectLoanType = (loanType) => {
    navigate('/personal-loan');
  };

  const handleComingSoon = (type) => {
    window.alert(`${type} loans coming soon`);
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
          margin-bottom: 8px;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        .header h2 {
          font-size: 24px;
          margin-top: 12px;
          color: #ffffff;
        }

        .loan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
          flex: 1;
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
          text-align: center;
          font-size: 16px;
        }

        .loan-card:hover {
          border-color: #e74c3c;
          background: #3a3a3a;
        }

        .loan-card.active {
          border-color: #e74c3c;
          background: #3a3a3a;
        }

        @media (max-width: 480px) {
          .page {
            border-radius: 0;
            min-height: 100vh;
          }

          .loan-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navbar />

      <div className="header">
        <button
          className="back-btn"
          onClick={() => {}}
          aria-label="Back"
          style={{ visibility: 'hidden' }}
        >
          ←
        </button>
        <h2>Apply for a New Loan</h2>
      </div>

      <div className="loan-grid">
        <button
          className="loan-card active"
          onClick={() => handleSelectLoanType('personal')}
        >
          PERSONAL
        </button>
        <button
          className="loan-card"
          onClick={() => handleComingSoon('EDUCATIONAL')}
        >
          EDUCATIONAL
        </button>
        <button
          className="loan-card"
          onClick={() => handleComingSoon('HOME')}
        >
          HOME
        </button>
        <button
          className="loan-card"
          onClick={() => handleComingSoon('VEHICLE')}
        >
          VEHICLE
        </button>
        <button
          className="loan-card"
          onClick={() => handleComingSoon('BUSINESS')}
        >
          BUSINESS
        </button>
      </div>
    </div>
  );
};

export default LoanTypesPage;
