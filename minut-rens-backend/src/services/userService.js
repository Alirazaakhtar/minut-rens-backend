const userModel = require('../models/userModel');

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

module.exports = {
  getAllUsers,
  getUserById
};