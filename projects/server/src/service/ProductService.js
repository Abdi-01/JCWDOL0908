const db = require("../model");
const { Category, Product, ProductWarehouseRlt, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { UnlinkPhoto } = require("../helper/Multer");
const { getWarehousesData } = require("./AdminWarehouseService");

const getProductByName = async (product_name, id_product) => {
  let product;
  if (id_product) {
    product = await Product.findOne({ where: { product_name, id_product: { [Op.not]: id_product } } });
  } else {
    product = await Product.findOne({ where: { product_name } });
  }
  return product;
};

const createProductWarehouseRlt = async (id_product, id_warehouse, transaction) => {
  const response = await ProductWarehouseRlt.create(
    { id_product, stock: 0, id_warehouse, booked_stock: 0 },
    { transaction },
  );
  return response;
};

const createProduct = async (product_name, description, weight_kg, product_image, id_category, price, transaction) => {
  const result = await Product.create(
    {
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      is_deleted: false,
    },
    { transaction },
  );
  return result;
};

const postNewProductLogic = async (data) => {
  const { product_name, description, weight_kg, product_image, id_category, price } = data;
  const transaction = await db.sequelize.transaction();
  let result;
  let createData;
  try {
    const isNameExist = await getProductByName(product_name);
    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };
    createData = await createProduct(
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      transaction,
    );
    const id_product = createData.dataValues.id_product;
    const getWarehouses = await getWarehousesData();

    for (let iter = 0; iter < getWarehouses.length; iter++) {
      const id_warehouse = getWarehouses[iter].dataValues.id_warehouse;
      await createProductWarehouseRlt(id_product, id_warehouse, transaction);
    }

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(product_image);
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = { postNewProductLogic };
