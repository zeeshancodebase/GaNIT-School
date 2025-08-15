const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const collegeController = require("../controllers/college.controller");

// Protect all routes
router.use(authMiddleware);

// Routes for Colleges
router.get("/", collegeController.getColleges);            // Get all colleges
router.post("/addCollege", collegeController.addCollege);            // Add a new college

// Routes to update college details
router.patch("/:id/general", collegeController.updateCollegeDetails);  // Update general college details

// Routes to update outreach details
router.patch("/:id/outreach", collegeController.updateOutreachDetails);  // Update outreach details

// Delete a college
router.delete("/:id", collegeController.deleteCollege);

// Get activity logs for a specific college
router.get("/:id/logs", collegeController.getCollegeLogs);

module.exports = router;
