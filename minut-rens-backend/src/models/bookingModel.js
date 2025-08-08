const db = require('../config/db');

const getAllBookings = async () => {
  const [rows] = await db.execute('SELECT * FROM bookings ORDER BY booking_date DESC');
  return rows;
};

const getBookingsByUser = async (user_id) => {
  const sql = `
    SELECT 
      b.*, 
      s.name AS service_name
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.user_id = ?
  `;
  const [rows] = await db.execute(sql, [user_id]);
  return rows;
};

const getBookingById = async (id) => {
  const sql = 'SELECT * FROM bookings WHERE id = ?';
  //[] tager det første element i array'et som er et array som indeholder booking
  const [rows] = await db.execute(sql, [id]);
  //i det array er det første element den booking vi søger
  return rows[0];
};

const insertBooking = async (user_id, booking) => {

  const sql = `INSERT INTO bookings (
    user_id, 
    service_id, 
    drop_off_date, 
    pick_up_date, 
    status, 
    total_price
    ) VALUES (?, ?, ?, ?, ?, ?)`;

  //Disse værdier skal være præcis de varibler som komme med json-objektet  
  const values = [
    user_id,
    booking.service_id,
    booking.drop_off_date,
    booking.pick_up_date,
    booking.status,
    booking.total_price
  ];

  const [result] = await db.execute(sql, values);
  return {"id": result.insertId, ...booking};
};

const updateBooking = async (id, booking) => {
  const sql = `
    UPDATE bookings
    SET service_id = ?, 
        drop_off_date = ?, 
        pick_up_date = ?, 
        status = ?, 
        total_price = ?
    WHERE id = ?
  `;

  const values = [
    booking.service_id,
    booking.drop_off_date,
    booking.pick_up_date,
    booking.status,
    booking.total_price,
    id
  ];

  const [result] = await db.execute(sql, values);

  if (result.affectedRows === 0) return null;

  return { id, ...booking };
};

const deleteBooking = async (id) => {
   const sql = 'DELETE FROM bookings WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
  
    if (result.affectedRows === 0) return null;
  
    return { id };
};

module.exports = {
  insertBooking,
  getBookingsByUser,
  getBookingById,
  deleteBooking,
  updateBooking,
  getAllBookings
};