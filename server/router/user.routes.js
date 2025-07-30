const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Admin/protected routes (you can add auth middleware later)
router.get('/getCurrentUser', authMiddleware,  userController.getCurrentUser);
router.get('/getAllUsers', userController.getAllUsers);

router.get('/getAllHRs', userController.getAllHRs);


router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);



module.exports = router;
