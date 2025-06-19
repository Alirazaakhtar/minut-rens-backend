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

const getAllUsers = async () => {
  const [rows] = await db.execute('SELECT id, name, email, role FROM users');
  return rows;
};

const getUserById = async (id) => {
  const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
  const [rows] = await db.execute(sql,[id]);
  return rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
    getUserById
};