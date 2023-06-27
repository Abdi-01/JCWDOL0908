const { ProductWarehouseRltLogic } = require("../logic");

const getTotalStockProducts = async (req, res, next) => {
  let { offset, limit, page, name_search, id_category, id_warehouse } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  page = parseInt(page);
  id_category = parseInt(id_category);
  id_warehouse = parseInt(id_warehouse);
  try {
    const { error, result } = await ProductWarehouseRltLogic.getTotalStockProductsLogic(
      offset,
      limit,
      page,
      name_search,
      id_category,
      id_warehouse,
    );
    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { getTotalStockProducts };
