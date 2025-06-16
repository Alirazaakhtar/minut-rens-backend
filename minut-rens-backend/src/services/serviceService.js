const serviceModel = require('../models/serviceModel');

const getAllServices = async () => {
    return serviceModel.getAllServices();
};

module.exports = {
    getAllServices
}; 