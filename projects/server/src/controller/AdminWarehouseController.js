const { AdminWarehouseService } = require("../service");

const getAllWarehouse = async (req, res, next) => {
  const warehouses = await AdminWarehouseService.getWarehousesLogic();
  const { error, result } = warehouses;
  if (!result) return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
};

const deleteWarehouse = async (req, res, next) => {};

module.exports = { getAllWarehouse, deleteWarehouse };
