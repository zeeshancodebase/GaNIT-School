// models/Lead.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,  // basic validation for 10-digit mobile
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  yearOfPassout: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: []
  },
  occupation: {
    type: String,
    enum: ["Student", "Working", "Job-Hunting"],
    required: false
  },
  currentSalary: {
    type: String,
  },
  preferredCourse: {
    type: String,
  },
  linkedIn: {
    type: String,
    required: false,
    trim: true
  },
  appliedFor:{type:String},
  status: {
    type: String,
    enum: ["New", "Contacted", "Interested", "Enrolled", "Not Interested", "Rejected"],
    default: "New"
  },
  source: {
    type: String,
    default: "Website",
    enum: ["Website", "LinkedIn", "Referral", "Instagram", "WhatsApp", "Campaign", "Other"]
  },
  referralCode: {
    type: String
  },
  note: {
    type: String,
    trim: true
  }


}, { timestamps: true });

module.exports = mongoose.model('candidate', candidateSchema);
