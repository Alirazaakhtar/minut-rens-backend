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

const updateService = async (id, data) => {
  return await serviceModel.updateService(id, data);
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService
}; 