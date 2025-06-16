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

module.exports = {
    getAllServices, 
    getServiceById,
    createService
};