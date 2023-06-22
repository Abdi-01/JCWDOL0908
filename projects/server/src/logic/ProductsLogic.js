const { ProductService, AdminWarehouseService } = require("../service");
const { UnlinkPhoto } = require("../helper/Multer");
const db = require("../model");

const getProductsLogic = async (offset, limit, page, id_category) => {
  try {
    let productsCount;
    let totalPage;
    //check if offset, limit, page value is given
    if (offset && limit && page) {
      // if offset, limit, page value is given, then count total data and total page needed
      productsCount = await ProductService.getProductsCount(id_category);
      productsCount = productsCount[0].dataValues.product_count;
      totalPage = Math.ceil(productsCount / limit);
    }

    let productsList = await ProductService.getProducts(offset, limit, page, id_category);
    productsList = productsList.map((product) => {
      return product.dataValues;
    });

    const result = { productsList, totalPage };
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

const postNewProductLogic = async (data) => {
  const { product_name, description, weight_kg, product_image, id_category, price } = data;
  const transaction = await db.sequelize.transaction();
  let result;
  let createData;
  try {
    //checck if name already exists
    const isNameExist = await ProductService.getProductByName(product_name);
    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };
    // if name doesn't exist, create product
    createData = await ProductService.createProduct(
      product_name,
      description,
      weight_kg,
      product_image,
      id_category,
      price,
      transaction,
    );
    // grab the created product's id_product data
    const id_product = createData.dataValues.id_product;
    // get all warehouses
    const getWarehouses = await AdminWarehouseService.getWarehousesData();
    // give the relation between created product with all warehouses
    for (let iter = 0; iter < getWarehouses.length; iter++) {
      const id_warehouse = getWarehouses[iter].dataValues.id_warehouse;
      await ProductService.createProductWarehouseRlt(id_product, id_warehouse, transaction);
    }

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(product_image);
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = { getProductsLogic, postNewProductLogic };
