const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', authenticateToken, bookingController.getBookingsByUser);
router.get('/:id', authenticateToken, bookingController.getBookingById);
router.post('/', authenticateToken, bookingController.createBooking);
router.delete('/id', authenticateToken, bookingController.deleteBooking);

//Admin routes
router.put('/:id', authenticateToken, authorizeAdmin, bookingController.updateBooking);

module.exports = router;