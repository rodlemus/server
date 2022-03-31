const UserEntity = require("../models/user.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserEntity.findOne({ username });
    if (!user) res.status(401).send();
    const passwordComparation = await bcrypt.compare(password, user.password);

    if (user && passwordComparation) {
      const { password, ...result } = user;
      const jwt = generateAccessToken(user._id);
      res.status(200).json({ access_token: jwt });
    }
    res.status(401).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24d",
  });
};

module.exports = authController;
