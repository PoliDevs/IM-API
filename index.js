require("dotenv").config();
const server = require("./src/servers");
const { conn } = require("./src/databases/mysql.js");

const { SERVER_PUERTO } = process.env;

const puerto = SERVER_PUERTO || 3001;
let mensaje = "%s listening at " + puerto;
conn
  .sync({ force: true })
  .then(() => {
    server.listen(puerto, () => {
      console.log(mensaje);
    });
  })
  .catch((err) => {
    console.error("The next error happens on the root:", err);
  });
