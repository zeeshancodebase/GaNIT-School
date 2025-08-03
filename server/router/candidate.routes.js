// routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
} = require('../controllers/candidate.controller');

// Route for creating a new candidate
router.post('/createCandidate', createCandidate);

// Route for fetching all candidates
router.get('/getAllCandidates', getAllCandidates);

// Route for fetching a candidate by ID
router.get('/candidates/:id', getCandidateById);

// Route for updating a candidate
router.patch('/candidates/:id', updateCandidate);

// Route for deleting a candidate
router.delete('/candidates/:id', deleteCandidate);

module.exports = router;
