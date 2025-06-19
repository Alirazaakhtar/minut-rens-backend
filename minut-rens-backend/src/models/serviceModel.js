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

const updateService = async (id, data) => {
  const sql = `
    UPDATE services
    SET name = ?, description = ?, price = ?
    WHERE id = ?`;

  const values = [data.name, data.description, data.price, id];
  const [result] = await db.execute(sql, values);

  if (result.affectedRows === 0) return null;

  return { id, ...data };
};

const deleteService = async (id) => {
  const sql = 'DELETE FROM services WHERE id = ?';
  const [result] = await db.execute(sql, [id]);

  if (result.affectedRows === 0) return null;

  return { id };
};

module.exports = {
    getAllServices,
    getServiceById,
    insertService,
    updateService,
    deleteService
};