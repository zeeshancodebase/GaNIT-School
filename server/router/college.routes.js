const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getColleges,
  addCollege,
  updateCollege,
  deleteCollege,
  getCollegeLogs
} = require("../controllers/college.controller");

// Protect all routes
router.use(authMiddleware);

// Routes
router.get("/", getColleges);
router.post("/addCollege", addCollege);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);
router.get("/:id/logs",getCollegeLogs);


module.exports = router;
