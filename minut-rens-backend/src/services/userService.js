const userModel = require('../models/userModel');

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const updateUser = async (id, user) => {
  return await userModel.updateUser(id, user);
}

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};