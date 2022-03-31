const router = require("express").Router();
const producsController = require("../controllers/products.controller");
const jwtMiddleware = require("../middlewares/validateToken.middleware");

router.post(
  "/merntest/api/v1/products",
  jwtMiddleware,
  producsController.saveProduct
);
router.patch(
  "/merntest/api/v1/products/:id",
  jwtMiddleware,
  producsController.updateProductById
);
router.delete(
  "/merntest/api/v1/products/:id",
  jwtMiddleware,
  producsController.deleteProductById
);
router.get("/merntest/api/v1/products/:id", producsController.getProductById);
router.get(
  "/merntest/api/v1/products",
  producsController.getProductsByCategory
);
router.get(
  "/merntest/api/v1/search-products",
  producsController.getProductsBySearch
);

module.exports = router;
