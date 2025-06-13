const db = require('../config/db');

const getAllBookings = async () => {
  return bookings;
};

const getBookingById = async (id) => {
  return bookings.find(b => b.bookingId === id);
};

const insertBooking = async (booking) => {
  bookings.push(booking);
  return booking;
};

const updateBooking = async (id, data) => {
  const index = bookings.findIndex(b => b.bookingId === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...data, bookingId: id };
    return bookings[index];
  }
  return null;
};

const deleteBooking = async (id) => {
  const index = bookings.findIndex(b => b.bookingId === id);
  if (index !== -1) {
    return bookings.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  insertBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
  updateBooking
};