const db = require("../model");
const { Category } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const getCategory = async (category_name, transaction) => {
  const category = await Category.findOne({ where: { category_name }, transaction });
  return category;
};

const createCategory = async (category_image, category_name, transaction) => {
  const newCategory = await Category.create({ category_image, category_name, is_deleted: 0 }, { transaction });
};

const createNewCategoryLogic = async (category_image, category_name) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isNameExist = await getCategory(category_name, transaction);

    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };

    const result = await createCategory(category_image, category_name, transaction);

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = { createNewCategoryLogic };
