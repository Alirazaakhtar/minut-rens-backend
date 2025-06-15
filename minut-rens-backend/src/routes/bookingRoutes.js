const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, bookingController.getBookingsByUser);
router.get('/:id', authenticateToken, bookingController.getBookingById);
router.post('/', authenticateToken, bookingController.createBooking);
router.put('/:id', authenticateToken, bookingController.updateBooking);
router.delete('/id', authenticateToken, bookingController.deleteBooking);

module.exports = router;