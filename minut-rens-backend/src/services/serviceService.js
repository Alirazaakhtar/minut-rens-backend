const serviceModel = require('../models/serviceModel');

const getAllServices = async () => {
    return serviceModel.getAllServices();
};

const getServiceById = async (serviceId) => {
    return serviceModel.getServiceById(serviceId);
};

const createService = async (service) => {
    return serviceModel.insertService(service);
};

module.exports = {
    getAllServices,
    getServiceById,
    createService
}; 