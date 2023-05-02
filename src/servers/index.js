const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes/routes");

const server = express();
server.name = "My Node.js Server";
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

server.use("/api", routes);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error("The next error happens in servers: ", err);
  res.status(status).send(message);
});

module.exports = server;
