const db = require('../config/db');

const findUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
}

const createUser = async (user) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [user.name, user.email, user.password]);
  const email = user.email;
  return { id: result.insertId, email};
};

module.exports = {
    findUserByEmail,
    createUser
};