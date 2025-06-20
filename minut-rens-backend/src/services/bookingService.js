const bookingModel = require('../models/bookingModel');

const getAllBookings = async () => {
  return bookingModel.getAllBookings();
};

const getBookingsByUser = async (userId) => {
  return await bookingModel.getBookingsByUser(userId);
};

const getBookingById = async (id) => {
  return bookingModel.getBookingById(id);
};

const createBooking = async (userId, booking) => {
  return bookingModel.insertBooking(userId, booking);
};

const updateBooking = async (id, data) => {
  return bookingModel.updateBooking(id, data);
};

const deleteBooking = async (id) => {
  return bookingModel.deleteBooking(id);
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getBookingById,
  deleteBooking,
  updateBooking,
  getAllBookings
};