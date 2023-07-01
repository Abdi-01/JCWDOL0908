const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize, MutationProcess, ProductWarehouseRlt } = db;

const insertNewMutation = async (id_user, id_product, quantity, from_id_warehouse, to_id_warehouse, transaction) => {
  const newRequest = await MutationProcess.create(
    {
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      is_approve: 0,
      is_sending: 0,
      is_accepted: 0,
      created_by: id_user,
      id_user,
      transaction,
    },
    { transaction },
  );
  return newRequest;
};

const updateStockAndBookedStock = async (id_product_warehouse, newStock, stock, booked_stock, transaction) => {
  const update = await ProductWarehouseRlt.update(
    { stock: newStock, booked_stock },
    { where: { id_product_warehouse, stock }, transaction },
  );
  return update;
};

module.exports = { insertNewMutation, updateStockAndBookedStock };
