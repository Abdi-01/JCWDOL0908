const db = require("../model");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize, Transaction, User, Address, City, TransactionProductRlt, Warehouse, Product } = db;

const getUsersTransactions = async (dataInput) => {
  let { id_warehouse, offset, limit, page, status_order } = dataInput;
  let data;
  if (!status_order) {
    status_order = { [Op.not]: "" };
  }
  if (id_warehouse) {
    data = await Transaction.findAll({
      where: {
        id_warehouse,
        status_order,
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Address,
          attributes: ["address", "id_city"],
          include: {
            model: City,
            attributes: ["type_city", "city"],
          },
        },
        { model: TransactionProductRlt, include: { model: Product } },
        { model: Warehouse },
      ],
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
    });
  } else {
    data = await Transaction.findAll({
      where: {
        status_order,
      },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Address,
          attributes: ["address", "id_city"],
          include: {
            model: City,
            attributes: ["type_city", "city"],
          },
        },
        { model: TransactionProductRlt, include: { model: Product } },
        { model: Warehouse },
      ],
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
      order: [["updatedAt", "DESC"]],
    });
  }
  return data;
};

const getTotalData = async (dataInput) => {
  let { id_warehouse, status_order } = dataInput;
  let dataCount;
  if (!status_order) {
    status_order = { [Op.not]: "" };
  }
  if (id_warehouse) {
    dataCount = await Transaction.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_transaction")), "dataCount"]],
      where: { status_order, id_warehouse },
    });
  } else {
    dataCount = await Transaction.findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id_transaction")), "dataCount"]],
      where: { status_order },
    });
  }
  return dataCount;
};

const getUserTransaction = async (id_transaction) => {
  const transaction = await Transaction.findOne({
    where: { id_transaction },
    include: { model: TransactionProductRlt },
  });
  return transaction;
};

const updateStatus = async (id_transaction, status_update, status_before, transaction) => {
  const reject = await Transaction.update(
    { status_order: status_update },
    { where: { id_transaction, status_order: status_before }, transaction },
  );
  return reject;
};

module.exports = { getUsersTransactions, getTotalData, getUserTransaction, updateStatus };
