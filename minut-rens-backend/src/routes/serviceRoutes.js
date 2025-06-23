const express = require('express');
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authenticateToken = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');

//Customer routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

//KUN Admin
router.post('/', authenticateToken, authorizeAdmin, serviceController.createService);
router.put('/:id', authenticateToken, authorizeAdmin, serviceController.updateService);
router.delete('/:id', authenticateToken, authorizeAdmin, serviceController.deleteService);

module.exports = router;