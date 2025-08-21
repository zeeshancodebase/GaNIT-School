const Candidate = require('../models/candidateModel');
const ActivityLog = require('../models/activityLogModel');
const mongoose = require('mongoose');
const { generateLogs, generateNestedLogs } = require('../utils/logHelper');

// @desc Get all candidates with filtering & pagination
exports.getCandidates = async (req, res, next) => {
  try {
    const {
      search,
      status,
      assignedTo,
      source,
      followUpStartDate,
      followUpEndDate,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (search) {
      query["$or"] = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }



    if (status) {
      query['outreachDetails.status'] = status;
    }


    // Assigned To filter
    if (assignedTo) {
      if (mongoose.Types.ObjectId.isValid(assignedTo)) {
        query["outreachDetails.assignedTo"] = new mongoose.Types.ObjectId(assignedTo);
      } else {
        return res.json({ candidates: [], total: 0, page: Number(page), pages: 0 });
      }
    }



    if (source) {
      query.source = source;
    }

    if (followUpStartDate || followUpEndDate) {
      query["outreachDetails.followUpDate"] = {};
      if (followUpStartDate && !isNaN(new Date(followUpStartDate).getTime())) {
        query["outreachDetails.followUpDate"].$gte = new Date(followUpStartDate);
      }
      if (followUpEndDate && !isNaN(new Date(followUpEndDate).getTime())) {
        query["outreachDetails.followUpDate"].$lte = new Date(followUpEndDate);
      }
    }

    const limitNum = Number(limit);
    const pageNum = Number(page);

    const candidates = await Candidate.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ updatedAt: -1 })
      .populate('outreachDetails.assignedTo', 'name email')
    const total = await Candidate.countDocuments(query);
    const pages = Math.ceil(total / limitNum);


    return res.json({
      candidates,
      total,
      page: pageNum,
      pages,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// @desc Add new candidate
exports.addCandidate = async (req, res, next) => {
  const {
    name,
    email,
    mobile,
    city,
    dob,
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
    appliedFor,
    outreachDetails = {}, // Receive nested object from client
  } = req.body;

  // Validate required fields
  if (!name || !email || !mobile || !degree || !branch || !college || !university || !yearOfPassout) {
    return res.status(400).json({ message: 'Missing required fields. Please fill all required inputs.' });
  }

  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
    return res.status(409).json({ message: 'Candidate with this email already exists.' });
  }

  // Move assignedTo into outreachDetails
  if (outreachDetails.assignedTo) {
    outreachDetails.assignedTo = outreachDetails.assignedTo;
  }

  try {
    const newCandidate = new Candidate({
      name,
      email,
      mobile,
      city,
      dob,
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
      appliedFor,
      outreachDetails,
    });

    await newCandidate.save();

    // Populate the outreachDetails.assignedTo field
    await newCandidate.populate('outreachDetails.assignedTo', 'name email');

    res.status(201).json(newCandidate);
  } catch (error) {
    console.log(error);
    next(error);

  }
};

// @desc Update general candidate details by ID
exports.updateCandidateDetails = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const fields = [
      'name',
      'email',
      'mobile',
      'city',
      'dob',
      'degree',
      'branch',
      'college',
      'university',
      'yearOfPassout',
      'skills',
      'occupation',
      'currentSalary',
      'preferredCourse',
      'linkedIn',
      'source',
      'referralCode',
      'appliedFor',

    ];

    // Generate logs for general fields
    const logs = generateLogs({
      modelId: candidate._id,
      modelType: 'Candidate',
      changedBy: req.user._id,
      fields,
      originalDoc: candidate,
      updatedFields: req.body,
    });

    // Apply the actual field updates
    fields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== candidate[field]) {
        candidate[field] = req.body[field];
      }
    });
    await candidate.save();
    // Save logs in bulk
    if (logs.length > 0) {
      await ActivityLog.insertMany(logs);
    }

    res.json(candidate);
  } catch (error) {
    console.log(error);
    next(error);

  }
};

// @desc Update outreach details by ID
exports.updateOutreachDetails = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    // Generate logs for outreach details (status, note, followUpDate)
    const logs = generateNestedLogs({
      modelId: candidate._id,
      modelType: 'Candidate',
      changedBy: req.user._id,
      fields: ['status', 'note', 'followUpDate'],
      originalDoc: candidate.outreachDetails,
      updatedFields: req.body,
    });

    // Handle assignedTo separately
    if (req.body.assignedTo !== undefined && String(req.body.assignedTo) !== String(candidate.outreachDetails.assignedTo)) {
      const User = require('../models/userModel');

      const oldUser = await User.findById(candidate.outreachDetails.assignedTo).select('name');
      const newUser = await User.findById(req.body.assignedTo).select('name');

      logs.push({
        modelId: candidate._id,
        modelType: 'Candidate',
        changedBy: req.user._id,
        changeType: 'assignedTo_update',
        oldValue: oldUser ? { _id: oldUser._id, label: oldUser.name } : 'Unassigned',
        newValue: newUser ? { _id: newUser._id, label: newUser.name } : 'Unassigned',
      });

      candidate.outreachDetails.assignedTo = req.body.assignedTo;
    }

    // Apply updates for status, note, followUpDate
    ['status', 'note', 'followUpDate'].forEach(field => {
      if (req.body[field] !== undefined) {
        candidate.outreachDetails[field] = req.body[field];
      }
    });

    await candidate.save();

    if (logs.length > 0) {
      await ActivityLog.insertMany(logs);
    }

    await candidate.populate('outreachDetails.assignedTo', 'name email');

    res.json(candidate);
  } catch (error) {
    console.log(error);
    next(error);

  }
};

// @desc Get activity logs for a candidate
exports.getCandidateLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      modelId: req.params.id,
      modelType: 'Candidate',
    })
      .populate('changedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    await candidate.deleteOne(); // This triggers pre-delete middleware for activity logs

    res.json({ message: 'Candidate and related logs deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
