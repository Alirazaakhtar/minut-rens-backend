const bookings = [
  {
    bookingId: 1,
    userId: 'user101',
    service: 'wash',
    dropOffDate: '2025-06-12',
    pickUpDate: '2025-06-13',
    status: 'pending',
    totalPrice: 129.99,
    bookingDate: '2025-06-10'
  },
  {
    bookingId: 2,
    userId: 'user102',
    service: 'dryclean',
    dropOffDate: '2025-06-14',
    pickUpDate: '2025-06-15',
    status: 'in_progress',
    totalPrice: 199.99,
    bookingDate: '2025-06-10'
  }
];

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