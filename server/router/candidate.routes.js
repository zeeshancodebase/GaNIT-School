const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const candidateController = require('../controllers/candidate.controller');



router.post("/create", candidateController.addCandidate);  // Add a new candidate

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Routes for Candidates
router.get("/", candidateController.getCandidates);        // Get all candidates with filtering and pagination

// Routes to get, update, or delete a candidate by ID
// router.get("/:id", candidateController.getCandidateById);  // Get candidate by ID
router.patch("/:id/general", candidateController.updateCandidateDetails);  // Update general candidate details
router.patch("/:id/outreach", candidateController.updateOutreachDetails);  // Update outreach details
router.delete("/:id", candidateController.deleteCandidate);  // Delete candidate by ID


module.exports = router;
