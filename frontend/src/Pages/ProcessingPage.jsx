import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
      setTimeout(() => {
        navigate('/result');
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSkip = () => {
    setProcessing(false);
    navigate('/result');
  };

  const handleBack = () => {
    navigate('/review-application');
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

        .processing-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
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
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .processing-text {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }

        .processing-note {
          color: #888;
          font-size: 13px;
          text-align: center;
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
        <h3>CFL</h3>
        <h2>Processing</h2>
      </div>

      <div className="processing-container">
        {processing ? (
          <>
            <div className="spinner"></div>
            <p className="processing-text">Analyzing your application...</p>
            <p className="processing-note">This may take a few moments</p>
          </>
        ) : (
          <p className="processing-text">Application Processed Successfully!</p>
        )}
      </div>

      <div className="nav-buttons">
        <button className="secondary-btn" onClick={handleBack}>
          BACK
        </button>
        <button className="primary-btn" onClick={handleSkip}>
          {processing ? 'Skip Wait' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ProcessingPage;
