const db = require("../model");
const { ProductWarehouseRltService } = require("../service");

const isNameSearchAndCategoryFilterFilled = (name_search, id_category) => {
  return name_search !== "null" && id_category;
};

const getDataWithNameAndCategoryFilter = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithNameAndCateogryFilter(
    name_search,
    id_category,
  );
  let productsList = await ProductWarehouseRltService.getProductsWithNameAndCategoryFilter(
    offset,
    limit,
    page,
    name_search,
    id_category,
    id_warehouse,
  );
  productsCount = productsCount[0]?.dataValues?.product_count;
  const totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithCategoryFilter = async (offset, limit, page, id_category, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithCategoryFilter(id_category);
  let productsList = await ProductWarehouseRltService.getProductsWithCategoryFilter(
    offset,
    limit,
    page,
    id_category,
    id_warehouse,
  );
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithNameFilter = async (offset, limit, page, name_search, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithNameFilter(name_search);
  let productsList = await ProductWarehouseRltService.getProductsWithNameFilter(
    offset,
    limit,
    page,
    name_search,
    id_warehouse,
  );
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);
  return { totalPage, productsList };
};

const getDataWithoutFiltering = async (offset, limit, page, id_warehouse) => {
  let productsCount = await ProductWarehouseRltService.getProductsCountWithoutFilter();
  let productsList = await ProductWarehouseRltService.getProductsWithoutFilter(offset, limit, page, id_warehouse);
  productsCount = productsCount[0].dataValues.product_count;
  totalPage = Math.ceil(productsCount / limit);

  return { totalPage, productsList };
};

const getTotalStockProductsLogic = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  let result;
  try {
    if (isNameSearchAndCategoryFilterFilled(name_search, id_category)) {
      result = await getDataWithNameAndCategoryFilter(offset, limit, page, name_search, id_category, id_warehouse);
    } else if (id_category) {
      result = await getDataWithCategoryFilter(offset, limit, page, id_category, id_warehouse);
    } else if (name_search !== "null") {
      result = await getDataWithNameFilter(offset, limit, page, name_search, id_warehouse);
    } else {
      result = await getDataWithoutFiltering(offset, limit, page, id_warehouse);
    }
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

module.exports = { getTotalStockProductsLogic };
