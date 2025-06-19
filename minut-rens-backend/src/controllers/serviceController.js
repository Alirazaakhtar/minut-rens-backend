const { json } = require('express');
const serviceRoutes = require('../routes/serviceRoutes');
const serviceService = require('../services/serviceService');

const getAllServices = async (req, res) =>{
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverfejl: kunne ikke hente services' });
    }
};

const getServiceById = async (req, res) =>{
    try {
        const serviveId = parseInt(req.params.id);
        const service = await serviceService.getServiceById(serviveId);
        if(service) res.json(service);
        else res.status(404).json({error: "Service ikke fundet"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Serverfejl: kunne ikke hente service'});
    }
};

const createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body);
        res.status(201).json(service);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const updateService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const updated = await serviceService.updateService(id, data);

    if (!updated) {
      return res.status(404).json({ error: 'Service ikke fundet' });
    }

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke updatere service' });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await serviceService.deleteService(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Service ikke fundet' });
    }

    res.json({ message: 'Service slettet', deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Serverfejl: kunne ikke slette service' });
  }
};

module.exports = {
    getAllServices, 
    getServiceById,
    createService,
    updateService,
    deleteService
};