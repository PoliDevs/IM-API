//* este módulo es el primero en ejecutarse
const colors = require('colors')

console.log("entramos a index".bgCyan); 

//! necesitamos conectar  al server y a la base de datos
require('dotenv').config()
const server = require('./src/servers')
const { conn } = require('./src/databases/mysql.js')

const { SERVER_PUERTO } = process.env

const puerto=SERVER_PUERTO || 3001;
let mensaje = "%s listening at "+puerto;
console.log(puerto.bgGreen);
conn
.sync({force:true})
.then(()=>{
  server.listen(puerto,()=>{
    console.log(mensaje.rainbow);
  })
})
.catch((err)=>{
  console.error("errr:".bgRed,err)
})