const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  contactPerson: String,
  contactEmail: String,
  contactPhone: String,
  status: {
    type: String,
    enum: [
      "Not Contacted",
      "Contacted",
      "Follow-Up",
      "Meeting Scheduled",
      "Not Interested",
      "Signed Up",
    ],
    default: "Not Contacted",
  },
  notes: String,
  followUpDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("College", collegeSchema);
