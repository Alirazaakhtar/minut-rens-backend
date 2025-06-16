const serviceRoutes = require('../routes/serviceRoutes');
const serviceService = require('../services/serviceService');

const getAllServices = async (req, res) =>{
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Serverfejl: kunne ikke hente services' });
    }
};

const getServiceById = () =>{};


module.exports = {
    getAllServices,
    getServiceById
};