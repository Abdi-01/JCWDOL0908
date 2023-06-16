const db = require("../model");
const { User, AdminRole, Warehouse } = db;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/CreateToken");

const getAdminByUsername = async (username) => {
  const result = await User.findOne({
    where: { [Op.and]: [{ username }, { is_deleted: 0 }] },
    include: { model: AdminRole },
  });
  return result;
};

const getAdminById = async (id_user) => {
  const result = await User.findOne({ where: { id_user }, include: { model: AdminRole } });
  return result;
};

const getWarehouseByIdAdmin = async (id_role) => {
  const result = await AdminRole.findOne({ where: { id_role }, include: { model: Warehouse } });
  return result;
};

const updateToken = async (id_user, token, transaction) => {
  const result = await User.update({ user_token: token }, { where: { id_user }, transaction });
  return result;
};

const loginAdmin = async (username, password, transaction) => {
  let result;
  let tokenPayload;
  const user = await getAdminByUsername(username);

  // check whether the username-input match the username in DB
  if (!user) return { status: 401, message: "invalid username and password", isSuccess: false };

  // check whether the password-input match the password in DB
  const isPasswordMatch = await bcrypt.compare(password, user.dataValues.password);
  if (!isPasswordMatch) return { status: 401, message: "invalid username and password", isSuccess: false };

  const { id_user, is_admin, id_role, admin_role } = user.dataValues;
  const { role_admin, id_warehouse } = admin_role.dataValues;

  // check whether it's super-admin or warehouse-admin
  if (!id_warehouse) {
    result = { id_user, username, is_admin, id_role, role_admin };
    tokenPayload = result;
  } else {
    console.log(id_warehouse);
    const getWarehouse = await getWarehouseByIdAdmin(id_role);
    const { warehouse_name, id_city } = getWarehouse.dataValues.warehouse.dataValues;
    result = {
      id_user,
      username,
      is_admin,
      id_role,
      role_admin,
      id_warehouse,
      warehouse_name,
      id_city,
    };
    tokenPayload = { id_user, username, is_admin, id_role, role_admin };
  }

  // create Token
  const token = createToken(tokenPayload);
  const tokenUpdate = await updateToken(id_user, token, transaction);
  return { status: 200, message: "success fetched data", isSuccess: true, result, token };
};

const keepLogin = async (id_user) => {
  let result;
  let tokenPayload;
  const user = await getAdminById(id_user);

  // check whether the id_user match in DB
  if (!user) return { status: 401, message: "invalid ID User", isSuccess: false };
  const { username, is_admin, id_role, admin_role } = user.dataValues;
  const { role_admin, id_warehouse } = admin_role.dataValues;

  // check whether it's super-admin or warehouse-admin
  if (!id_warehouse) {
    result = { id_user, username, is_admin, id_role, role_admin };
    tokenPayload = result;
  } else {
    const getWarehouse = await getWarehouseByIdAdmin(id_role);
    const { warehouse_name, address, id_city } = getWarehouse.dataValues.warehouse.dataValues;
    result = {
      id_user,
      username,
      is_admin,
      id_role,
      role_admin,
      id_warehouse,
      warehouse_name,
      id_city,
    };
    tokenPayload = { id_user, username, is_admin, id_role, role_admin };
  }

  // create Token
  const token = createToken(tokenPayload);
  return { status: 200, message: "success fetched data", isSuccess: true, result, token };
};

module.exports = { loginAdmin, keepLogin };
