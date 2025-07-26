const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
      appLink: { type: String, required: true },
    isNew: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
