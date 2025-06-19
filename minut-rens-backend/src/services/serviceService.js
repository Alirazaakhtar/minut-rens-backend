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

const deleteService = async (id) => {
  return await serviceModel.deleteService(id);
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}; 