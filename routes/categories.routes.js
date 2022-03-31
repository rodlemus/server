const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");
const jwtMiddleware = require("../middlewares/validateToken.middleware");

router.post(
  "/merntest/api/v1/categories",
  jwtMiddleware,
  categoriesController.saveCategory
);
router.patch(
  "/merntest/api/v1/categories/:id",
  jwtMiddleware,
  categoriesController.updateCategoryById
);
router.delete(
  "/merntest/api/v1/categories/:id",
  jwtMiddleware,
  categoriesController.deleteCategoryById
);
router.get(
  "/merntest/api/v1/categories/:id",
  categoriesController.getCategoryById
);
router.get("/merntest/api/v1/categories", categoriesController.getCategories);

module.exports = router;
