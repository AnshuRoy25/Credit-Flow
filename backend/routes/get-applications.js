import express from "express";
import verifyToken from "../middleware/verifytoken.js";
import User from "../models/user.js";

const router = express.Router();

// Get all loan applications for logged-in user
router.get("/my-applications", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).select('loanApplications');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Sort by most recent first
    const applications = user.loanApplications.sort((a, b) => 
      new Date(b.appliedAt) - new Date(a.appliedAt)
    );

    res.status(200).json({
      success: true,
      applications
    });

  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch applications" 
    });
  }
});

// Get specific loan application by ID
router.get("/application/:applicationId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { applicationId } = req.params;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const application = user.loanApplications.find(
      app => app.applicationId === applicationId
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({
      success: true,
      application
    });

  } catch (error) {
    console.error("Get Application Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch application" 
    });
  }
});

export default router;