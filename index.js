//* este módulo es el primero en ejecutarse

console.log("entramos a index");

//! necesitamos conectar  al server y a la base de datos
require("dotenv").config();
const server = require("./src/servers");
const { conn } = require("./src/databases/mysql.js");

const { SERVER_PUERTO } = process.env;

const puerto = SERVER_PUERTO || 3001;
let mensaje = "%s listening at " + puerto;
console.log(puerto);
conn
  .sync({ force: true })
  .then(() => {
    server.listen(puerto, () => {
      console.log(mensaje);
    });
  })
  .catch((err) => {
    console.error("errr:".bgRed, err);
  });
