const db = require("../model");
const { Category, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const getCategory = async (category_name, transaction) => {
  const category = await Category.findOne({ where: { category_name }, transaction });
  return category;
};

const getCategoriesCount = async () => {
  const categoriesCount = await Category.findAll({
    where: { is_deleted: 0 },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_category")), "category_count"]],
  });
  return categoriesCount;
};

const getCategories = async (offset, limit, page) => {
  const categories = await Category.findAll({
    where: { is_deleted: 0 },
    offset: parseInt(offset) * (parseInt(page) - 1),
    limit: parseInt(limit),
  });
  return categories;
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

const getCategoriesLogic = async (offset, limit, page) => {
  try {
    let categoriesCount = await getCategoriesCount();
    let categories = await getCategories(offset, limit, page);

    categories = categories.map((category) => {
      return category.dataValues;
    });
    categoriesCount = categoriesCount[0].dataValues.category_count;
    const totalPage = Math.ceil(categoriesCount / limit);

    const result = { categories, totalPage };
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

module.exports = { createNewCategoryLogic, getCategoriesLogic };
