import React, { useState } from 'react';
import { User, TrendingUp } from 'lucide-react';
import Navbar from '../components/navbar.jsx';
import BottomTaskbar from '../components/BottomTaskbar.jsx';
import '../styles/Home.css';

export default function LoanAppDashboard() {
  const [profileComplete, setProfileComplete] = useState(75);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Phone Frame */}
        <div className="phone-frame">
          <Navbar />
          {/* Header Section */}
          <div className="header-section">
            <h1 className="greeting-title">HELLO, ANSHU!</h1>
            
            {/* Account Status Card */}
            <div className="account-status-card">
              <div className="status-content">
                <span className="status-text">Account active: Ready to apply</span>
                <div className="status-checkbox"></div>
              </div>
            </div>

            {/* Icon Section with Profile and Progress */}
            <div className="icon-section">
              <div className="icon-card">
                <User className="user-icon" />
              </div>
              <div className="icon-card">
                <TrendingUp className="progress-icon" />
                <span className="progress-percentage">{profileComplete}%</span>
              </div>
            </div>
          </div>

          {/* Credit Flow Information Box */}
          <div className="info-box">
            <h3 className="info-title">What is credit flow?</h3>
            <p className="info-description">
              Credit flow represents your financial readiness and borrowing capacity. 
              It's determined by your income, expenses, credit history, and current obligations.
            </p>
          </div>

          {/* Apply for Loan Button Card */}
          <div className="apply-card">
            <button className="apply-button">
              <div className="apply-content">
                <div className="apply-text-container">
                  <div className="apply-title">Ready to apply for loan</div>
                  <div className="apply-subtitle">Get interest from 12% - 6 months</div>
                </div>
                <div className="apply-arrow-container">
                  <svg className="apply-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* ============================================ */}
          {/* BOTTOM NAVIGATION BAR - START */}
          {/* This section contains the 5 circular navigation dots */}
          {/* Active dot has red border, inactive have neutral border */}
          {/* ============================================ */}
          <BottomTaskbar />
          {/* ============================================ */}
          {/* BOTTOM NAVIGATION BAR - END */}
          {/* ============================================ */}
        </div>
      </div>
    </div>
  );
}
