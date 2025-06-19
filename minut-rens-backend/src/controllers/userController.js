const userService = require('../services/userService');

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente brugere' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) return res.status(404).json({ error: 'Bruger ikke fundet' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Serverfejl: kunne ikke hente bruger' });
  }
};

module.exports = {
  getAllUsers,
  getUserById
};