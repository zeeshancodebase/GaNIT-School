const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  modelId: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  refPath: "modelType",
},
modelType: {
  type: String,
  required: true,
  enum: ["College", "Candidate"] // Add more model names as needed
},

  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  changeType: String, // e.g. "status_update", "note_update", "new_college"
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
