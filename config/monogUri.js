require("dotenv").config();
module.exports = databaseuri =
  "mongodb://127.0.0.1:27017/" +
  (!process.env.INIT_DATABASE ? "test" : process.env.INIT_DATABASE);
