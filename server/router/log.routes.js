// server/router/general.routes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getActivityLogs } = require("../controllers/activityLog.controller");


// Protect all routes
router.use(authMiddleware);

router.get('/activityLogs/:modelType/:modelId', getActivityLogs);

module.exports = router;
