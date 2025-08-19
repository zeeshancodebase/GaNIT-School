const College = require("../models/collegeModel");
const ActivityLog = require("../models/activityLogModel");
const mongoose = require("mongoose");
const { generateLogs, generateNestedLogs } = require("../utils/logHelper");

// @desc Get all colleges with filtering & pagination
exports.getColleges = async (req, res, next) => {
  try {
    const {
      search,
      status,
      assignedTo,
      createdBy,
      location,
      followUpStartDate,
      followUpEndDate,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (status) {
      query["outreachDetails.status"] = status;
    }

    if (assignedTo) {
      if (mongoose.Types.ObjectId.isValid(assignedTo)) {
        query["outreachDetails.assignedTo"] = new mongoose.Types.ObjectId(assignedTo);
      } else {
        return res.json({ colleges: [], total: 0, page: Number(page), pages: 0 });
      }
    }

    if (createdBy) {
      if (mongoose.Types.ObjectId.isValid(createdBy)) {
        query.createdBy = new mongoose.Types.ObjectId(createdBy);
      } else {
        return res.json({ colleges: [], total: 0, page: Number(page), pages: 0 });
      }
    }

    if (location) {
      query.location = location;
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

    // Debug print the query
    // console.log("MongoDB Query:", JSON.stringify(query, null, 2));

    const limitNum = Number(limit);
    const pageNum = Number(page);

    const colleges = await College.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ updatedAt: -1 })
      .populate("outreachDetails.assignedTo", "name email")
      .populate("createdBy", "name");

    const total = await College.countDocuments(query);
    const pages = Math.ceil(total / limitNum);

    // console.log("Result count:", colleges.length, "Total:", total, "Pages:", pages);

    return res.json({
      colleges,
      total,
      page: pageNum,
      pages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Add new college
exports.addCollege = async (req, res) => {
  const {
    name,
    location,
    contactPerson,
    contactEmail,
    contactPhone,
    assignedTo,
    outreachDetails = {}, // receive nested object from client
  } = req.body;

  if (!name) return res.status(400).json({ message: "College name is required" });

  // Move assignedTo into outreachDetails
  if (assignedTo) {
    outreachDetails.assignedTo = assignedTo;
  }

  try {
    const newCollege = new College({
      name,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      outreachDetails,
      createdBy: req.user._id,
    });

    await newCollege.save();

    // Populate the outreachDetails.assignedTo field
    await newCollege.populate("outreachDetails.assignedTo", "name email");

    res.status(201).json(newCollege);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




// @desc Update general college details by ID
exports.updateCollegeDetails = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    const fields = [
      "name",
      "location",
      "contactPerson",
      "contactEmail",
      "contactPhone",
    ];

    // Generate logs
    const logs = generateLogs({
      modelId: college._id,
      modelType: "College",
      changedBy: req.user._id,
      fields,
      originalDoc: college,
      updatedFields: req.body,
    });

    // Apply the actual field updates
    fields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== college[field]) {
        college[field] = req.body[field];
      }
    });
    await college.save();

    // Save logs in bulk
    if (logs.length > 0) {
      await ActivityLog.insertMany(logs);
    }

    res.json(college);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update outreach details by ID
exports.updateOutreachDetails = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    // Use your util to generate logs for these nested fields:
    const logs = generateNestedLogs({
      modelId: college._id,
      modelType: "College",
      changedBy: req.user._id,
      fields: ["status", "note", "followUpDate"], // fields inside outreachDetails
      originalDoc: college.outreachDetails,
      updatedFields: req.body,
    });

    // Handle assignedTo separately because you want old/new user names, not just IDs
    if (
      req.body.assignedTo !== undefined &&
      String(req.body.assignedTo) !== String(college.outreachDetails.assignedTo || "")
    ) {
      const User = require("../models/userModel");

      const oldUser = await User.findById(college.outreachDetails.assignedTo).select("name");
      const newUser = await User.findById(req.body.assignedTo).select("name");

      logs.push({
        modelId: college._id,
        modelType: "College",
        changedBy: req.user._id,
        changeType: "assignedTo_update",
        oldValue: oldUser
          ? { _id: oldUser._id, label: oldUser.name }
          : "Unassigned",
        newValue: newUser
          ? { _id: newUser._id, label: newUser.name }
          : "Unassigned",
      });

      college.outreachDetails.assignedTo = req.body.assignedTo;
    }

    // Apply the updates for status, note, followUpDate from req.body:
    ["status", "note", "followUpDate"].forEach((field) => {
      if (req.body[field] !== undefined) {
        college.outreachDetails[field] = req.body[field];
      }
    });

    await college.save();

    if (logs.length > 0) {
      await ActivityLog.insertMany(logs);
    }

    await college.populate("outreachDetails.assignedTo", "name email");

    res.json(college);
  } catch (error) {
    console.log(error);
    next(error);

    // res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc Get activity logs for a college
exports.getCollegeLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      modelId: req.params.id,
      modelType: "College",
    }).populate("changedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc Delete a college
exports.deleteCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    await college.deleteOne(); // This triggers your pre('deleteOne') middleware

    res.json({ message: "College and related logs deleted" });
  } catch (error) {
    // console.log(error);
    next(error);

    // res.status(500).json({ message: "Server Error", error: error.message });
  }
};
