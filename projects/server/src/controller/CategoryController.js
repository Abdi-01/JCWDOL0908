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

      //validate input data
      var { error, value } = AdminDataValidation.CreateNewCategory.validate({ category_name });
      if (error) throw error;

      var { error, result } = await CategoryService.createNewCategoryLogic(category_image, category_name);

      // check whether error exists
      if (error) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });

      return res.status(202).send({ isSuccess: true, message: "success create category", result });
    });
  } catch (error) {
    next(error);
  }
};

const editCategory = async (req, res, next) => {
  try {
  } catch (error) {}
};

const getCategories = async (req, res, next) => {
  try {
    const { offset, limit, page } = req.query;
    const { error, result } = await CategoryService.getCategoriesLogic(offset, limit, page);

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id_category } = req.params;
  console.log(id_category);
  try {
    const { error, result } = await CategoryService.deleteCategoryLogic(id_category);
    console.log(error, result);
    if (error) return res.status(error?.statusCode).send({ message: error?.errMsg, isSuccess: false });

    return res.status(202).send({ message: "data deleted", isSuccess: true });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { createNewCategory, editCategory, getCategories, deleteCategory };
