const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');

//Admin routes
router.get('/admin', authenticateToken, authorizeAdmin, bookingController.getAllBookings);
router.put('/:id', authenticateToken, authorizeAdmin, bookingController.updateBooking);
router.delete('/id', authenticateToken, authorizeAdmin, bookingController.deleteBooking);

//Customer routes
router.get('/', authenticateToken, bookingController.getBookingsByUser);
router.get('/:id', authenticateToken, bookingController.getBookingById);
router.post('/', authenticateToken, bookingController.createBooking);

module.exports = router;