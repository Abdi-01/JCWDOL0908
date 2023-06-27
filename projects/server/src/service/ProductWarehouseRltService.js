const db = require("../model");
const { sequelize, ProductWarehouseRlt, Product } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const createProductWarehouseRlt = async (id_product, id_warehouse, transaction) => {
  const response = await ProductWarehouseRlt.create(
    { id_product, stock: 0, id_warehouse, booked_stock: 0 },
    { transaction },
  );
  return response;
};

const getProductsCountWithNameAndCateogryFilter = async (name_search, id_category) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, id_category, product_name: { [Op.substring]: name_search } },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

const getProductsWithNameAndCategoryFilter = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product
    WHERE pw.is_deleted = 0 AND p.product_name LIKE '%${name_search}%' AND p.id_category = ${id_category} 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsCountWithNameFilter = async (name_search) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, product_name: { [Op.substring]: name_search } },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

const getProductsCountWithCategoryFilter = async (id_category) => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0, id_category },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });

  return productsCount;
};

const getProductsWithNameFilter = async (offset, limit, page, name_search, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product
    WHERE pw.is_deleted = 0 AND p.product_name LIKE '%${name_search}%' 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsWithCategoryFilter = async (offset, limit, page, id_category, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product
    WHERE pw.is_deleted = 0 AND p.id_category = ${id_category} 
    ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""}
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsWithoutFilter = async (offset, limit, page, id_warehouse) => {
  const products = await sequelize.query(
    `SELECT p.id_product,p.product_name , ${id_warehouse ? "pw.stock" : "SUM(pw.stock)"} as totalStock, 
    ${id_warehouse ? "pw.booked_stock" : "SUM(pw.booked_stock)"} as bookedStock, p.weight_kg 
    FROM product_warehouse_rlt pw JOIN products p ON pw.id_product = p.id_product
    WHERE pw.is_deleted = 0 ${id_warehouse ? "AND pw.id_warehouse = " + id_warehouse : ""} 
    ${id_warehouse ? "" : "GROUP BY p.id_product"} ORDER BY p.product_name 
    LIMIT ${offset * (page - 1)},${limit}`,
    { type: QueryTypes.SELECT },
  );
  return products;
};

const getProductsCountWithoutFilter = async () => {
  const productsCount = await Product.findAll({
    where: { is_deleted: 0 },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_product")), "product_count"]],
  });
  return productsCount;
};

module.exports = {
  createProductWarehouseRlt,
  getProductsCountWithNameAndCateogryFilter,
  getProductsWithNameAndCategoryFilter,
  getProductsCountWithNameFilter,
  getProductsWithNameFilter,
  getProductsCountWithCategoryFilter,
  getProductsWithCategoryFilter,
  getProductsWithoutFilter,
  getProductsCountWithoutFilter,
};
