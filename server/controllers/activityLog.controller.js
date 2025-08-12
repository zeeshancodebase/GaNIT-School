const ActivityLog = require("../models/activityLogModel");

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ college: req.params.id })
      .populate("changedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
};
