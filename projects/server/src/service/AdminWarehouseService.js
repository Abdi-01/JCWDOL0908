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

const getWarehousesDataCount = async () => {
  const warehouseCount = await Warehouse.findAll({
    where: {
      is_deleted: 0,
    },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_warehouse")), "warehouse_count"]],
  });
  return warehouseCount;
};

const getWarehousesData = async (offset, limit, page) => {
  const warehouses = await Warehouse.findAll({
    where: { is_deleted: 0 },
    include: { model: City, include: { model: Province } },
    offset: parseInt(offset) * (parseInt(page) - 1),
    limit: parseInt(limit),
  });
  return warehouses;
};

const deleteWarehouseById = async (id_warehouse, transaction) => {
  const deleteWarehouse = await Warehouse.update({ is_deleted: 1 }, { where: { id_warehouse }, transaction });
  return deleteWarehouse;
};

const getWarehousesLogic = async (offset, limit, page) => {
  try {
    let warehousesCount = await getWarehousesDataCount();
    const warehouses = await getWarehousesData(offset, limit, page);
    warehousesCount = warehousesCount[0].dataValues.warehouse_count;
    const totalPage = Math.ceil(warehousesCount / limit);
    const result = warehouses.map((warehouse, index) => {
      const { city } = warehouse.dataValues;
      const { id_city, type_city, province } = city;
      const { id_province } = province;
      return { ...warehouse.dataValues, id_city, city: city.city, type_city, province: province.province, id_province };
    });
    const data = { result, totalPage };
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
};

const deleteWarehouseLogic = async (id_warehouse) => {
  const transaction = await db.sequelize.transaction();
  try {
    const response = await deleteWarehouseById(id_warehouse, transaction);
    let result = response[0];
    if (!result) {
      result = "not found";
    } else {
      result = "success";
    }
    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  getSingleWarehouseAdmin,
  getAllWarehouseCity,
  getSpecificWarehouseByIdCity,
  getWarehousesLogic,
  deleteWarehouseLogic,
};
