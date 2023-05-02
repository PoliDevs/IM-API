require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false, // true para ver logs de creacion de tablas y otros
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  // dialectOptions: {
  //   mysql2: "^2.3.3",
  // },
});

//!apiticketupcode-production-0f30.up.railway.app
const basename = path.basename(__dirname);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//todo relations
const {
  Bussines,
  Bussines_types,
  Franchises,
  Franchise_types,
  Employees,
  Employee_types,
  Commerces,
  Cities,
  States,
  Countries,
  Comm_types,
  Menus,
  Pdvs,
  Pdv_types,
  Menu_types,
  Dishes,
  Table_services,
  Orders,
  Accounts,
  Payments,
  Additionals,
  Supplies,
  Recipes,
  Dishe_types,
  Products,
  Suppliers,
  Unit_types,
  Prod_types,
} = sequelize.models;

Bussines_types.hasMany(Bussines);
Bussines.belongsTo(Bussines_types);
Franchise_types.hasMany(Franchises);
Franchises.belongsTo(Franchise_types);
Bussines.hasMany(Franchises);
Franchises.belongsTo(Bussines);
Employee_types.hasMany(Employees);
Employees.belongsTo(Employee_types);
Employees.hasMany(Commerces);
Commerces.belongsTo(Employees);
Franchises.hasMany(Commerces);
Commerces.belongsTo(Franchises);
Cities.hasMany(Commerces);
Commerces.belongsTo(Cities);
States.hasMany(Commerces);
Commerces.belongsTo(States);
Countries.hasMany(Commerces);
Commerces.belongsTo(Countries);
Comm_types.hasMany(Commerces);
Commerces.belongsTo(Comm_types);
Menus.hasMany(Commerces);
Commerces.belongsTo(Menus);
Cities.hasMany(States);
States.belongsTo(Cities);
States.hasMany(Countries);
Countries.belongsTo(States);
Pdv_types.hasMany(Pdvs);
Pdvs.belongsTo(Pdv_types);
Pdvs.hasMany(Commerces);
Commerces.belongsTo(Pdvs);
Menu_types.hasMany(Menus);
Menus.belongsTo(Menu_types);
Dishes.hasMany(Menus);
Menus.belongsTo(Dishes);
Table_services.hasMany(Menus);
Menus.belongsTo(Table_services);
Menus.hasMany(Orders);
Orders.belongsTo(Menus);
Pdvs.hasMany(Orders);
Orders.belongsTo(Pdvs);
Employees.hasMany(Orders);
Orders.belongsTo(Employees);
Dishes.hasMany(Orders);
Orders.belongsTo(Dishes);
Accounts.hasMany(Orders);
Orders.belongsTo(Accounts);
Payments.hasMany(Orders);
Orders.belongsTo(Payments);
Additionals.hasMany(Dishes);
Dishes.belongsTo(Additionals);
Supplies.hasMany(Dishes);
Dishes.belongsTo(Supplies);
Recipes.hasMany(Dishes);
Dishes.belongsTo(Recipes);
Dishe_types.hasMany(Dishes);
Dishes.belongsTo(Dishe_types);
Products.hasMany(Recipes);
Recipes.belongsTo(Products);
Supplies.hasMany(Recipes);
Recipes.belongsTo(Supplies);
Suppliers.hasMany(Supplies);
Supplies.belongsTo(Suppliers);
Unit_types.hasMany(Products);
Products.belongsTo(Unit_types);
Prod_types.hasMany(Products);
Products.belongsTo(Prod_types);
Suppliers.hasMany(Products);
Products.belongsTo(Suppliers);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
