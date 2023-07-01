const db = require("../model");
const { MutationService, ProductWarehouseRltService } = require("../service");

const createNewMutationRequestLogic = async (data) => {
  const { id_user, id_product, quantity, from_id_warehouse, to_id_warehouse } = data;
  const transaction = await db.sequelize.transaction();
  try {
    const getRelation = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, from_id_warehouse);
    let { id_product_warehouse, stock, booked_stock } = getRelation;

    //update a new stock in a target warehouse after booked by a mutation request
    const newStock = stock - quantity;
    booked_stock = booked_stock + quantity;
    const updateStockAndBookedStock = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      newStock,
      stock,
      booked_stock,
      transaction,
    );

    if (!updateStockAndBookedStock[0]) throw { errMsg: "server error, please try again later", statusCode: 500 };

    // create a new mutation request
    const createMutationRequest = await MutationService.insertNewMutation(
      id_user,
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      transaction,
    );

    if (!createMutationRequest.dataValues) throw { errMsg: "server error, please try again later", statusCode: 500 };

    await transaction.commit();
    return { error: null, result: createMutationRequest.dataValues };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

module.exports = { createNewMutationRequestLogic };
