const db = require('../config/db');

const getAllServices = async () => {
    const [rows] = await db.execute("SELECT * FROM services");
    return rows;
};

const getServiceById = async (serviceId) => {
    const sql = "SELECT * FROM services WHERE id = ?";
    const [rows] = await db.execute(sql, [serviceId]);
    return rows[0];
};

const insertService = async (service) => {
    const sql = "INSERT INTO services (name, description, price) VALUES (?, ?, ?)";
    const values = [
        service.name,
        service.description,
        service.price,
    ];

    const [result] = await db.execute(sql, values);
    return {"id": result.insertId, ...service};
}

module.exports = {
    getAllServices,
    getServiceById,
    insertService
};