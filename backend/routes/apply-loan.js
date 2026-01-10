import express from "express";
import verifyToken from "../middleware/verifytoken.js";
import User from "../models/user.js";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load test data once
const callLogs = JSON.parse(
  readFileSync(join(__dirname, '../data/test-data/callLogs.json'), 'utf-8')
);
const smsData = JSON.parse(
  readFileSync(join(__dirname, '../data/test-data/smsData.json'), 'utf-8')
);
const locationData = JSON.parse(
  readFileSync(join(__dirname, '../data/test-data/locationData.json'), 'utf-8')
);
const installedApps = JSON.parse(
  readFileSync(join(__dirname, '../data/test-data/installedApps.json'), 'utf-8')
);

const generateApplicationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `LFN${timestamp}${random}`.toUpperCase();
};

const calculateEMI = (principal, annualRate, tenureMonths) => {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
               (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
};

router.post("/apply-loan", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Extract data from request
    const { 
      loanAmount, 
      tenure, 
      loanType, 
      emiStartDate,
      // Employment Details (Screen 6)
      employmentType,
      companyName,
      designation,
      monthlyIncome,
      workExperienceYears,
      // Bank Details (Screen 6)
      accountNumber,
      bankName,
      ifscCode
    } = req.body;

    // Validate required fields
    if (!loanAmount || !tenure || !employmentType || !monthlyIncome || !accountNumber || !bankName || !ifscCode) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    // Call ML service
    const mlServiceUrl = "http://localhost:5001/predict-score";
    
    let creditScore;
    try {
      const mlResponse = await fetch(mlServiceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callLogs,
          smsData,
          locationData,
          installedApps
        })
      });

      if (!mlResponse.ok) {
        throw new Error("ML service returned error");
      }

      const mlData = await mlResponse.json();
      creditScore = mlData.creditflowScore;
    } catch (mlError) {
      console.error("ML Service Error:", mlError.message);
      return res.status(500).json({ 
        error: "Failed to calculate credit score. Please try again." 
      });
    }

    // Determine approval
    const isApproved = creditScore >= 80;
    const status = isApproved ? "APPROVED" : "DECLINED";
    
    // Calculate interest rate
    let interestRate;
    if (creditScore >= 80) interestRate = 10.5;
    else if (creditScore >= 70) interestRate = 11.5;
    else if (creditScore >= 60) interestRate = 12.5;
    else interestRate = 14.0;

    const approvedAmount = isApproved ? loanAmount : 0;
    const emi = isApproved ? calculateEMI(loanAmount, interestRate, tenure) : 0;

    // Create loan application with ALL details
    const loanApplication = {
      applicationId: generateApplicationId(),
      loanType: loanType || "Personal",
      loanAmount,
      approvedAmount,
      interestRate,
      tenure,
      emi,
      emiStartDate: emiStartDate || null,
      employmentDetails: {
        employmentType,
        companyName: companyName || null,
        designation: designation || null,
        monthlyIncome,
        workExperienceYears: workExperienceYears || 0
      },
      bankDetails: {
        accountNumber,
        bankName,
        ifscCode
      },
      status,
      creditScore,
      appliedAt: new Date(),
      processedAt: new Date()
    };

    // Save to database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.loanApplications.push(loanApplication);
    await user.save();

    // Return response
    res.status(200).json({
      success: true,
      message: isApproved 
        ? "Congratulations! Your loan has been approved." 
        : "Sorry, your loan application has been declined.",
      application: {
        applicationId: loanApplication.applicationId,
        status: loanApplication.status,
        creditScore: loanApplication.creditScore,
        loanAmount: loanApplication.loanAmount,
        approvedAmount: loanApplication.approvedAmount,
        interestRate: loanApplication.interestRate,
        tenure: loanApplication.tenure,
        emi: loanApplication.emi,
        appliedAt: loanApplication.appliedAt
      }
    });

  } catch (error) {
    console.error("Apply Loan Error:", error);
    res.status(500).json({ 
      error: "Failed to process loan application. Please try again." 
    });
  }
});

export default router;