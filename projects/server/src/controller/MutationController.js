const { MutationLogic } = require("../logic");
const { MutationValidation } = require("../validation");

const createNewMutationRequest = async (req, res, next) => {
  const data = { ...req.body };
  try {
    const { error: err_validation, value } = await MutationValidation.createNewMutation.validate({ ...data });
    if (err_validation) throw err_validation;

    const { error, result } = await MutationLogic.createNewMutationRequestLogic(data);

    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(201).send({ isSuccess: true, message: "success create request", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { createNewMutationRequest };
