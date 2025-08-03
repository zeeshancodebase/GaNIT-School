const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.get('/', jobController.getAllJobs);
router.get('/getJobById/:jobId', jobController.getJobById);
router.post('/createJob', jobController.createJob);
router.patch('/:id', jobController.updateJob);
router.patch('/close/:id', jobController.closeJob);
router.patch('/reopen/:id', jobController.reopenJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
