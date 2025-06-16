const db = require('../config/db');

const getAllServices = async () => {
    const [rows] = await db.execute("SELECT * FROM services");
    return rows;
};

module.exports = {
    getAllServices
};