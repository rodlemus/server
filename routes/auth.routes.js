const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/merntest/api/v1/login", authController.login);

module.exports = router;
