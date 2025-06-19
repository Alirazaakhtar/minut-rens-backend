const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', authenticateToken, authorizeAdmin, userController.getAllUsers);

router.get('/:id', authenticateToken, authorizeAdmin, userController.getUserById);

module.exports = router;