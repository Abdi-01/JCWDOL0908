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

const conditionQuery = (id_warehouse, mutationType) => {
  let condition;
  if (id_warehouse && mutationType == "mutation-in") {
    condition = `mp.to_id_warehouse=${id_warehouse} AND`;
  } else if (id_warehouse && mutationType == "mutation-out") {
    condition = `mp.from_id_warehouse=${id_warehouse} AND`;
  } else if (id_warehouse && !mutationType) {
    condition = `(mp.to_id_warehouse=${id_warehouse} OR mp.from_id_warehouse=${id_warehouse}) AND`;
  } else {
    condition = "mp.id_mutation<>0 AND";
  }
  return condition;
};

const statusConditionQuery = (status, conditionBefore) => {
  if (status === "done") {
    conditionBefore += " mp.is_accepted=1";
  } else if (status === "rejected") {
    conditionBefore += " mp.is_reject=1";
  } else if (status === "on-delivery") {
    conditionBefore += " mp.is_sending=1";
  } else if (status === "approval-request") {
    conditionBefore += " mp.is_approve=0";
  } else {
    conditionBefore += " mp.quantity <> 0";
  }
  return conditionBefore;
};

const fetchDatas = async (data) => {
  const { id_warehouse, mutationType, offset, limit, page, status } = data;
  let condition = conditionQuery(id_warehouse, mutationType);
  console.log(condition);
  condition = statusConditionQuery(status, condition);
  const result = await sequelize.query(
    `SELECT mp.*, p.product_name, u.username as creator,
     w.warehouse_name as from_warehouse, ww.warehouse_name as to_warehouse 
     FROM mutation_processes mp 
     JOIN warehouses w ON mp.from_id_warehouse = w.id_warehouse
     JOIN warehouses ww ON mp.to_id_warehouse = ww.id_warehouse
     JOIN products p ON mp.id_product = p.id_product
     JOIN users u ON mp.created_by = u.id_user
     WHERE ${condition} LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return result;
};

const fetchDatasCount = async (data) => {
  const { id_warehouse, mutationType, status } = data;
  let condition = conditionQuery(id_warehouse, mutationType);
  condition = statusConditionQuery(status, condition);
  let totalCount = await sequelize.query(
    `SELECT COUNT(id_mutation) as dataCount
  FROM mutation_processes mp WHERE ${condition}`,
    {
      type: QueryTypes.SELECT,
    },
  );
  return totalCount;
};

module.exports = { insertNewMutation, updateStockAndBookedStock, fetchDatas, fetchDatasCount };
