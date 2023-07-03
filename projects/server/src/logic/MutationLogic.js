const db = require("../model");
const { MutationService, ProductWarehouseRltService } = require("../service");

const createNewMutationRequestLogic = async (data) => {
  const { id_user, id_product, quantity, from_id_warehouse, to_id_warehouse } = data;
  const transaction = await db.sequelize.transaction();
  try {
    const findRequestedWarehouse = await ProductWarehouseRltService.getProductWarehouseRlt(
      id_product,
      from_id_warehouse,
    );
    let { id_product_warehouse, stock, booked_stock } = findRequestedWarehouse;

    const findRequesterWarehouse = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, to_id_warehouse);

    if (!findRequesterWarehouse)
      throw { errMsg: "error: The stock has not been created on the requester's side", statusCode: 400 };

    //update a new stock in a target warehouse after booked by a mutation request
    const newStock = stock - quantity;
    if (newStock < 0) throw { errMsg: "error: not enough stock to initiate a mutation request", statusCode: 400 };
    booked_stock = booked_stock + quantity;
    const updateStockAndBookedStock = await MutationService.updateStockAndBookedStock(
      id_product_warehouse,
      newStock,
      stock,
      booked_stock,
      transaction,
    );

    if (!updateStockAndBookedStock[0]) throw { errMsg: "error: server error, please try again later", statusCode: 500 };

    // create a new mutation request
    const createMutationRequest = await MutationService.insertNewMutation(
      id_user,
      id_product,
      quantity,
      from_id_warehouse,
      to_id_warehouse,
      transaction,
    );

    if (!createMutationRequest.dataValues)
      throw { errMsg: "error: server error, please try again later", statusCode: 500 };

    await transaction.commit();
    return { error: null, result: createMutationRequest.dataValues };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return { error, result: null };
  }
};

const fetchMutationRequestsLogic = async (data) => {
  try {
    const totalData = await MutationService.fetchDatasCount(data);
    const totalPage = Math.ceil(totalData[0].dataCount / data.limit);
    const dataToSend = await MutationService.fetchDatas(data);
    return { error: null, result: { totalPage, dataToSend } };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

module.exports = { createNewMutationRequestLogic, fetchMutationRequestsLogic };
