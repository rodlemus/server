const CategoryEntity = require("../models/category.entity");

const initDatabaseRecords = () => {
  CategoryEntity.insertMany([
    { categoryName: "camisas" },
    { categoryName: "jeans" },
    { categoryName: "zapatos" },
    { categoryName: "sombreros" },
    { categoryName: "vestidos" },
  ]);
};

module.exports = initDatabaseRecords;
