const db = require("../model");
const { User, Province, City, AdminRole, Warehouse, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const getSingleWarehouseAdmin = async (id) => {
  const singleUser = await User.findOne({
    where: { id_user: id },
    include: { model: AdminRole, include: { model: Warehouse, include: { model: City } } },
  });

  const { id_user, username, email, phone_number, admin_role } = singleUser;
  result = {
    id_user,
    username,
    email,
    phone_number,
    id_role: admin_role.id_role,
    role: admin_role.role_admin,
    id_warehouse: admin_role.warehouse.id_warehouse,
    warehouse: admin_role.warehouse.warehouse_name,
    id_city: admin_role.warehouse.city.id_city,
    city: admin_role.warehouse.city.city,
    cityType: admin_role.warehouse.city.type_city,
  };
  return result;
};

const getAllWarehouseCity = async () => {
  const allWarehouseCity = await sequelize.query(
    `SELECT w.id_city, c.type_city, c.city, COUNT(*) as total_warehouse 
      FROM warehouses w JOIN cities c ON w.id_city = c.id_city GROUP BY w.id_city`,
    { type: QueryTypes.SELECT },
  );
  return allWarehouseCity;
};

const getSpecificWarehouseByIdCity = async (id_city) => {
  const warehouses = await Warehouse.findAll({ where: { id_city } });
  return warehouses;
};

const getWarehousesData = async () => {
  const warehouses = await Warehouse.findAll({
    where: { is_deleted: 0 },
    include: { model: City, include: { model: Province } },
  });
  return warehouses;
};

const deleteWarehouseById = async (id) => {};

const getWarehousesLogic = async () => {
  try {
    const warehouses = await getWarehousesData();
    const result = warehouses.map((warehouse, index) => {
      const { city } = warehouse.dataValues;
      const { id_city, type_city, province } = city;
      const { id_province } = province;
      return { ...warehouse.dataValues, id_city, city: city.city, type_city, province: province.province, id_province };
    });
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

const deleteWarehouseLogic = async (id) => {};

module.exports = {
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
  getWarehousesLogic,
  deleteWarehouseLogic,
};
