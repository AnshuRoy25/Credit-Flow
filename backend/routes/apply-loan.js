import express from "express";
import verifyToken from "../middleware/verifytoken.js";
import User from "../models/user.js";

const router = express.Router();

// Helper function to generate application ID
const generateApplicationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `LFN${timestamp}${random}`.toUpperCase();
};

// Helper function to calculate EMI
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
      callLogs,
      smsData,
      locationData,
      installedApps
    } = req.body;

    // Validate required fields
    if (!loanAmount || !tenure || !callLogs || !smsData || !locationData || !installedApps) {
      return res.status(400).json({ 
        error: "Missing required fields" 
      });
    }

    // Call ML service to get credit score
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

    // Determine approval based on credit score
    const isApproved = creditScore >= 60;
    const status = isApproved ? "APPROVED" : "DECLINED";
    
    // Calculate interest rate based on score
    let interestRate;
    if (creditScore >= 80) interestRate = 10.5;
    else if (creditScore >= 70) interestRate = 11.5;
    else if (creditScore >= 60) interestRate = 12.5;
    else interestRate = 14.0;

    const approvedAmount = isApproved ? loanAmount : 0;
    const emi = isApproved ? calculateEMI(loanAmount, interestRate, tenure) : 0;

    // Create loan application object
    const loanApplication = {
      applicationId: generateApplicationId(),
      loanAmount,
      loanType: loanType || "Personal",
      tenure,
      emiStartDate: emiStartDate || null,
      status,
      creditScore,
      approvedAmount,
      interestRate,
      emi,
      appliedAt: new Date(),
      processedAt: new Date()
    };

    // Save to user's loan applications
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