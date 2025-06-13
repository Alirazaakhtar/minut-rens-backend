const db = require('../config/db');

const findUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
}

const createUser = async (email, hashedPassword) => {
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const [result] = await db.execute(sql, [email, hashedPassword]);
  return { id: result.insertId, email };
};

module.exports = {
    findUserByEmail,
    createUser
};