const activityLogModel = require("../models/activityLogModel");

// controllers/activityLog.controller.js
exports.getActivityLogs = async (req, res, next) => {
  const { modelType, modelId } = req.params;
  try {
    const logs = await activityLogModel.find({
      modelId,
      modelType,
    })
      .populate("changedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    console.log(error);
    next(error)

    // res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
};
