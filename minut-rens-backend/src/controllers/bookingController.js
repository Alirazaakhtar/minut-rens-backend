const bookingService = require('../services/bookingService');

const getAllBookings = async (_req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente bookinger' });
  }
};

const getBookingById = async (req, res) => {
  try {
    //sikre at id er et tal
    const id = parseInt(req.params.id);
    const booking = await bookingService.getBookingById(id);
    if (booking) res.json(booking);
    else res.status(404).json({ message: 'Booking ikke fundet' });
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente booking' });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await bookingService.updateBooking(id, req.body);
    if (updated) res.json(updated);
    else res.status(404).json({ message: 'Booking ikke fundet' });
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke opdatere booking' });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await bookingService.deleteBooking(id);
    if (deleted) res.json(deleted);
    else res.status(404).json({ message: 'Booking ikke fundet' });
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke slette booking' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking
};