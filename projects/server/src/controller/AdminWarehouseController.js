const { AdminWarehouseService } = require("../service");

const getAllWarehouse = async (req, res, next) => {
  const warehouses = await AdminWarehouseService.getWarehousesLogic();
  const { error, result } = warehouses;
  if (!result) return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
};

const deleteWarehouse = async (req, res, next) => {
  const { id_warehouse } = req.params;
  const response = await AdminWarehouseService.deleteWarehouseLogic(id_warehouse);
  const { error, result } = response;
  if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });
  if (result === "not found") return res.status(404).send({ isSuccess: false, message: "warehouse not found" });
  if (result === "success") return res.status(202).send({ isSuccess: true, message: "warehouse deleted" });
};

module.exports = { getAllWarehouse, deleteWarehouse };
