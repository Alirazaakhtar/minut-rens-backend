const bookingService = require('../services/bookingService');
const mailService = require('../services/mailService');
const userService = require('../services/userService');
const serviceService = require('../services/serviceService');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente bookinger' });
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Hent fra decoded token (middleware)
    const bookings = await bookingService.getBookingsByUser(userId);
    res.json(bookings);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente booking' });
  }
};

const createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const booking = await bookingService.createBooking(userId, req.body);
    const user = await userService.getUserById(userId);
    const service = await serviceService.getServiceById(booking.service_id);
   
    await mailService.sendBookingConfirmation(booking, user, service);
    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await bookingService.updateBooking(id, req.body);
    const user = await userService.getUserById(updated.user_id);
    const service = await serviceService.getServiceById(updated.service_id);
    //sender mail ved status klar
    if(updated.status == 'klar til afhentning') mailService.SendReadyMail(updated, user, service);

    if (updated) res.json(updated);
    else res.status(404).json({ message: 'Booking ikke fundet' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke opdatere booking' });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await bookingService.deleteBooking(id);
    if (deleted) res.json(deleted);
    else res.status(404).json({ message: 'Booking ikke fundet' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke slette booking' });
  }
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getBookingById,
  deleteBooking,
  updateBooking,
  getAllBookings
};