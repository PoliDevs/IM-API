//* este módulo es el primero en ejecutarse
const colors = require("colors");

console.log("entramos a index".bgCyan);

//! necesitamos conectar  al server y a la base de datos
require("dotenv").config();
const server = require("./src/servers");
const { conn } = require("./src/databases/mysql.js");

const { SERVER_PUERTO } = process.env;

const port = SERVER_PUERTO || 3001;
let message = "%s listening at " + port;
console.log(port.bgGreen);
conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log(message.rainbow);
    });
  })
  .catch((err) => {
    console.error("errr:".bgRed, err);
  });
