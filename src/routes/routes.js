//* módulo que importa todas las rutas y las concentra en un sólo module.exports
const colors = require('colors')
const express = require('express')
const router = express.Router()

// const router = require("express").Router();

console.log("entramos a routes".bgYellow);

const cities = require('./cities');


router.use("/",cities);


module.exports= router;