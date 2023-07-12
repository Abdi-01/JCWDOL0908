const { AdminTransactionLogic } = require("../logic");

const getUserTransactions = async (req, res, next) => {
  try {
    const dataInput = { ...req.query };
    const { error, result } = await AdminTransactionLogic.getUserTransactionsLogic(dataInput);
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });
    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { getUserTransactions };
