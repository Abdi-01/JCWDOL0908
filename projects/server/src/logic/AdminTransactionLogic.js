const db = require("../model");
const { AdminTransactionService, ProductWarehouseRltService, MutationService } = require("../service");

const getUserTransactionsLogic = async (dataInput) => {
  try {
    let usersTransaction = await AdminTransactionService.getUsersTransactions(dataInput);
    let dataCount = await AdminTransactionService.getTotalData(dataInput);
    usersTransaction = usersTransaction.map((transaction) => {
      let { user: userObject, address: addressObject } = transaction;
      let { username } = userObject.dataValues;
      let { address, city: cityObject } = addressObject.dataValues;
      let { city, type_city } = cityObject;
      transaction = { ...transaction.dataValues, user: username, address: `${address}, ${type_city} ${city}` };
      return transaction;
    });
    const totalPage = Math.ceil(dataCount[0].dataValues.dataCount / parseInt(dataInput.limit));
    const result = { dataToSend: usersTransaction, totalPage };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const updateStatusLogic = async (id_transaction, status_update, status_before) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    const updateStatusOrder = await AdminTransactionService.updateStatus(
      id_transaction,
      status_update,
      status_before,
      dbTransaction,
    );
    if (!updateStatusOrder[0])
      throw { errMsg: "error: internal server error, please reload your page then try again", statusCode: 500 };
    await dbTransaction.commit();
    return { error: null, result: updateStatusOrder };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

const cancelOrderLogic = async (id_transaction) => {
  const dbTransaction = await db.sequelize.transaction();
  try {
    const getUserTransaction = await AdminTransactionService.getUserTransaction(id_transaction);
    let { status_order, transaction_product_rlts, id_warehouse } = getUserTransaction.dataValues;
    transaction_product_rlts = transaction_product_rlts.map((relation) => relation.dataValues);

    if (status_order === "sending" || status_order === "shipped" || status_order === "canceled")
      throw {
        errMsg: "error: cannot cancel a delivered-state order or an already canceled-state order",
        statusCode: 400,
      };

    const updateStatusOrder = await AdminTransactionService.updateStatus(
      id_transaction,
      "canceled",
      status_order,
      dbTransaction,
    );

    if (!updateStatusOrder[0])
      throw { errMsg: "error: internal server error, please try again later", statusCode: 500 };

    for (let iter = 0; iter < transaction_product_rlts.length; iter++) {
      const { id_product, quantity } = transaction_product_rlts[iter];
      const getWarehouseProductRlts = await ProductWarehouseRltService.getProductWarehouseRlt(id_product, id_warehouse);
      const { id_product_warehouse, stock, booked_stock } = getWarehouseProductRlts.dataValues;
      const newBookedStock = booked_stock - quantity;
      const updateNewBookedStock = await MutationService.updateStockAndBookedStock(
        id_product_warehouse,
        stock,
        stock,
        newBookedStock,
        booked_stock,
        dbTransaction,
      );
      if (!updateNewBookedStock[0])
        throw { errMsg: "error: some conflict occur, please try again later", statusCode: 500 };
    }
    await dbTransaction.commit();
    return { error: null, result: "success" };
  } catch (error) {
    console.log(error);
    await dbTransaction.rollback();
    return { error, result: null };
  }
};

module.exports = {
  getUserTransactionsLogic,
  updateStatusLogic,
  cancelOrderLogic,
};
