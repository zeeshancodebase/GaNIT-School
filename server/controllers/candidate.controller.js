const Candidate = require('../models/candidateModel');

// Create a new candidate
exports.createCandidate = async (req, res, next) => {
  const {
    name,
    email,
    mobile,
    city,
    dob,
    gender,
    degree,
    branch,
    college,
    university,
    yearOfPassout,
    skills,
    occupation,
    currentSalary,
    preferredCourse,
    linkedIn,
    source,
    referralCode,
    appliedFor
  } = req.body;

  // Validate required fields
  if (!name || !email || !mobile || !gender || !degree || !branch || !college || !university || !yearOfPassout) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields. Please fill all required inputs.',
    });
  }

  try {
    const newCandidate = new Candidate({
      name,
      email,
      mobile,
      city,
      dob,
      gender,
      degree,
      branch,
      college,
      university,
      yearOfPassout,
      skills,
      occupation,
      currentSalary,
      preferredCourse,
      linkedIn,
      source,
      referralCode,
      appliedFor
    });

    const savedCandidate = await newCandidate.save();

    res.status(201).json({
      success: true,
      data: savedCandidate,
    });
  } catch (error) {
    // console.log(error);

    // res.status(500).json({
    //   success: false,
    //   message: 'Server error while creating candidate',
    //   error: error.message,
    // });

    next(error);
  }
};


// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching candidates',
      error: error.message,
    });
  }
};

// Get a candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching candidate',
      error: error.message,
    });
  }
};

// Update candidate
exports.updateCandidate = async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Important: applies schema rules (like mobile format)
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating candidate',
      error: error.message,
    });
  }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    await candidate.remove();

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting candidate',
      error: error.message,
    });
  }
};
