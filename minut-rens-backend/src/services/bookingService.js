const bookingModel = require('../models/bookingModel');

const getAllBookings = async () => {
  return bookingModel.getAllBookings();
};

const getBookingById = async (id) => {
  return bookingModel.getBookingById(id);
};

const createBooking = async (booking) => {
  return bookingModel.insertBooking(booking);
};

const updateBooking = async (id, data) => {
  return bookingModel.updateBooking(id, data);
};

const deleteBooking = async (id) => {
  return bookingModel.deleteBooking(id);
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking
};