const express = require("express");
const cors = require("cors");

const connectDb = require("./config/database.js");
const userController = require("./controllers/userController.js");
const clientsController = require("./controllers/clientsController.js");

connectDb();
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", userController);
server.use("/api/clients", clientsController);

server.listen(5000, () => {
  console.log("server is listening to port 5000");
});
