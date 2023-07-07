const db = require("../model");
const { sequelize, ProductJournal } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const insertNewJournal = async (id_product, id_warehouse, id_activity, quantity, resultant_quantity, transaction) => {
  const response = await ProductJournal.create(
    { id_product, id_warehouse, id_activity, quantity, resultant_quantity },
    { transaction },
  );
  return response;
};

const getProductJournal = async (id_product, id_warehouse) => {
  const response = await sequelize.query(
    `SELECT * FROM product_journal 
     WHERE id_product=${id_product} AND id_warehouse=${id_warehouse}
     ORDER BY updatedAt DESC LIMIT 1`,
    { type: QueryTypes.SELECT },
  );
  return response;
};

module.exports = { insertNewJournal, getProductJournal };
