// server/router/general.routes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getActivityLogs } = require("../controllers/activityLog.controller");


// Protect all routes
router.use(authMiddleware);

// Specific logs by model
router.get("/:modelType/:modelId", getActivityLogs);

// ✅ All logs (for Admin Dashboard)
router.get("/", getActivityLogs);

module.exports = router;
