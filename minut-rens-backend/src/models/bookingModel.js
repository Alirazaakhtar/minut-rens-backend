const db = require('../config/db');

const getAllBookings = async () => {
  const [rows] = await db.execute('SELECT * FROM bookings');
  return rows;
};

const getBookingsByUser = async (userId) => {
  const sql = 'SELECT * FROM bookings WHERE user_id = ?';
  const [rows] = await db.execute(sql, [userId]);
  return rows;
};

const getBookingById = async (id) => {
  const sql = 'SELECT * FROM bookings WHERE id = ?';
  //[] tager det første element i array'et som er et array som indeholder booking
  const [rows] = await db.execute(sql, [id]);
  //i det array er det første element den booking vi søger
  return rows[0];
};

const insertBooking = async (userId, booking) => {

  const sql = `INSERT INTO bookings (
    user_id, 
    service, 
    drop_off_date, 
    pick_up_date, 
    status, 
    total_price, 
    booking_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  //Disse værdier skal være præcis de varibler som komme med json-objektet  
  const values = [
    userId,
    booking.service,
    booking.dropOffDate,
    booking.pickUpDate,
    booking.status,
    booking.totalPrice,
    booking.bookingDate
  ];

  const [result] = await db.execute(sql, values);
  return {"id": result.insertId, ...booking};
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
  getBookingsByUser,
  getBookingById,
  deleteBooking,
  updateBooking
};