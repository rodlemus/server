const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const databaseuri = require("./config/monogUri");
const productsRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const categoriesRoutes = require("./routes/categories.routes");
const initDatabaseRecords = require("./utils/initDatabaseRecords");

class Server {
  app = express();
  serverPort = process.env.PORT;
  configServer() {
    this.app.use(fileUpload({ createParentPath: true }));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.configRoutes();
  }
  configRoutes() {
    this.app.use("/", categoriesRoutes);
    this.app.use("/", productsRoutes);
    this.app.use("/", userRoutes);
    this.app.use("/", authRoutes);
  }
  startServer() {
    this.startDatabase();
    this.configServer();
    this.app.listen(this.serverPort, () =>
      console.log(`Server listening on port ${this.serverPort}`)
    );
  }

  startDatabase() {
    mongoose.connect(databaseuri).catch(console.log);
    // initDatabaseRecords();
  }
}

const server = new Server();
server.startServer();
