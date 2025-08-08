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

const updateUser = async (id, user) => {
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
  const [result] = await db.execute(
    sql, [user.name, user.email, user.role, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('Bruger ikke fundet');
  }

  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const deleteUser = async (id) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  const [result] = await db.execute(sql, [id]);

  if (result.affectedRows === 0) return null;

  return { id };
};

module.exports = {
    findUserByEmail,
    createUser,
    getAllUsers,
    getUserById,
    updateUser, deleteUser
};