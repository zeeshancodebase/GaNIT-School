const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  changeType: String, // e.g. "status_update", "note_update", "new_college"
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
