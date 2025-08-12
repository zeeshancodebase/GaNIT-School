const College = require("../models/collegeModel");
const ActivityLog = require("../models/activityLogModel");

// @desc Get all colleges with filtering & pagination
exports.getColleges = async (req, res, next) => {
  const { status, search, page = 1, limit = 20 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (search) query.name = { $regex: search, $options: "i" };

  try {
    const colleges = await College.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ updatedAt: -1 })
      .populate("assignedTo", "name email");

    const total = await College.countDocuments(query);
    res.json({
      colleges,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    // console.error("Error fetching colleges:", error);
    // res.status(500).json({ message: "Server Error", error: error.message });
    next(error);
  }
};

// @desc Add new college
exports.addCollege = async (req, res) => {
  const { name, location, contactPerson, contactEmail, contactPhone, assignedTo } = req.body;

  if (!name) return res.status(400).json({ message: "College name is required" });

  try {
    const newCollege = new College({
      name,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      assignedTo,
      createdBy: req.user._id,
    });

    await newCollege.save();
    res.status(201).json(newCollege);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




// @desc Update a college by ID
exports.updateCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    const fields = [
      "name",
      "location",
      "contactPerson",
      "contactEmail",
      "contactPhone",
      "status",
      "notes",
      "followUpDate",
      "assignedTo",
    ];

    const logs = [];

    fields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== college[field]) {
        // Save a log for each changed field
        logs.push({
          college: college._id,
          changedBy: req.user._id,
          changeType: `${field}_update`,
          oldValue: college[field],
          newValue: req.body[field],
        });

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
    console.log(error);
    
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get activity logs for a college
exports.getCollegeLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ college: req.params.id })
      .populate("changedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc Delete a college
exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });

    await college.remove();
    res.json({ message: "College deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
