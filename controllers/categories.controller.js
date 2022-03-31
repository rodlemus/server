const CategoryEntity = require("../models/category.entity");
const categoryController = {};

categoryController.saveCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const categories = await CategoryEntity.find({ categoryName });
    if (categories.length >= 1) res.status(400).send("category already exists");
    await CategoryEntity.create({
      categoryName,
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
};

categoryController.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryEntity.findByIdAndUpdate(id, { ...req.body });
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
};

categoryController.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryEntity.findByIdAndRemove(id, { ...req.body });
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
};

categoryController.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryEntity.findById(id, { ...req.body });
    res.status(200).send({ data: category });
  } catch (error) {
    res.status(500).send();
  }
};

categoryController.getCategories = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;
    const sort = req.query.sort || "asc";
    const categories = await CategoryEntity.find()
      .sort(sort)
      .limit(limit)
      .skip(skip);
    res.status(200).send({ data: categories });
  } catch (error) {
    res.status(500).send();
  }
};
module.exports = categoryController;
