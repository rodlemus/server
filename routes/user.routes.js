const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/merntest/api/v1/users", userController.createUser);

module.exports = router;
