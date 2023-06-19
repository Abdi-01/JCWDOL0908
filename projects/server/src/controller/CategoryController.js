const { UploadPhoto } = require("../helper/Multer");
const { CategoryService } = require("../service");
const { AdminDataValidation } = require("../validation");

const createNewCategory = async (req, res, next) => {
  try {
    const upload = await UploadPhoto("categories");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          data: null,
        });
      }
      const category_image = req.uniqueUrl;
      const { category_name } = JSON.parse(req.body.data);

      var { error, value } = AdminDataValidation.CreateNewCategory.validate({ category_name });
      if (error) throw error;

      var { error, result } = await CategoryService.createNewCategoryLogic(category_image, category_name);
      if (error) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });

      return res.status(202).send({ isSuccess: true, message: "success create category", result });
    });
  } catch (error) {
    next(error);
  }
};

const editCategory = async (req, res, next) => {};

module.exports = { createNewCategory };
