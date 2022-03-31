const UserEntity = require("../models/user.entity");
const bcrypt = require("bcrypt");
const userController = {};
userController.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    await UserEntity.create({ username, password: hashedPasword });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = userController;
