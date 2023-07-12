const { AdminTransactionService } = require("../service");

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

module.exports = {
  getUserTransactionsLogic,
};
