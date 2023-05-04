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
  Business,
  BusinessType,
  Franchise,
  FranchiseType,
  Employee,
  EmployeeType,
  Commerce,
  City,
  State,
  Country,
  CommerceType,
  Menu,
  Pos,
  PosType,
  MenuType,
  Dish,
  TableService,
  Order,
  Account,
  Payment,
  Additional,
  Supply,
  Recipe,
  DishType,
  Product,
  Supplier,
  UnitType,
  ProductType,
} = sequelize.models;

BusinessType.hasMany(Business);
Business.belongsTo(BusinessType);
FranchiseType.hasMany(Franchise);
Franchise.belongsTo(FranchiseType);
Business.hasMany(Franchise);
Franchise.belongsTo(Business);
EmployeeType.hasMany(Employee);
Employee.belongsTo(EmployeeType);
Employee.hasMany(Commerce);
Commerce.belongsTo(Employee);
Franchise.hasMany(Commerce);
Commerce.belongsTo(Franchise);
City.hasMany(Commerce);
Commerce.belongsTo(City);
State.hasMany(Commerce);
Commerce.belongsTo(State);
Country.hasMany(Commerce);
Commerce.belongsTo(Country);
CommerceType.hasMany(Commerce);
Commerce.belongsTo(CommerceType);
Menu.hasMany(Commerce);
Commerce.belongsTo(Menu);
City.hasMany(State);
State.belongsTo(City);
State.hasMany(Country);
Country.belongsTo(State);
PosType.hasMany(Pos);
Pos.belongsTo(PosType);
Pos.hasMany(Commerce);
Commerce.belongsTo(Pos);
MenuType.hasMany(Menu);
Menu.belongsTo(MenuType);
Dish.hasMany(Menu);
Menu.belongsTo(Dish);
TableService.hasMany(Menu);
Menu.belongsTo(TableService);
Menu.hasMany(Order);
Order.belongsTo(Menu);
Pos.hasMany(Order);
Order.belongsTo(Pos);
Employee.hasMany(Order);
Order.belongsTo(Employee);
Dish.hasMany(Order);
Order.belongsTo(Dish);
Account.hasMany(Order);
Order.belongsTo(Account);
Payment.hasMany(Order);
Order.belongsTo(Payment);
Additional.hasMany(Dish);
Dish.belongsTo(Additional);
Supply.hasMany(Dish);
Dish.belongsTo(Supply);
Recipe.hasMany(Dish);
Dish.belongsTo(Recipe);
DishType.hasMany(Dish);
Dish.belongsTo(DishType);
Product.hasMany(Recipe);
Recipe.belongsTo(Product);
Supply.hasMany(Recipe);
Recipe.belongsTo(Supply);
Supplier.hasMany(Supply);
Supply.belongsTo(Supplier);
UnitType.hasMany(Product);
Product.belongsTo(UnitType);
ProductType.hasMany(Product);
Product.belongsTo(ProductType);
Supplier.hasMany(Product);
Product.belongsTo(Supplier);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
