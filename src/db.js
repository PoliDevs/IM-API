/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const {
  // eslint-disable-next-line no-unused-vars
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false, // true para ver logs de creacion de tablas y otros
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
  // dialectOptions: {
  //   mysql2: '^2.3.3',
  // },
});

const basename = path.basename(__dirname);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models
fs.readdirSync(path.join(__dirname, 'models'))
  .filter(
    (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models);
// todo relations
const {
  Business,
  BusinessType,
  Franchise,
  FranchiseType,
  Employee,
  EmployeeType,
  Commerce,
  Bank,
  City,
  State,
  Country,
  CommerceFact,
  Menu,
  Pos,
  PosType,
  MenuType,
  Dish,
  Category,
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
  SuppliesType,
} = sequelize.models;

BusinessType.hasMany(Business);
Business.belongsTo(BusinessType);
FranchiseType.hasMany(Franchise);
Franchise.belongsTo(FranchiseType);
Business.hasMany(Franchise);
Franchise.belongsTo(Business);
EmployeeType.hasMany(Employee);
Employee.belongsTo(EmployeeType);
Commerce.hasMany(Employee);
Employee.belongsTo(Commerce);
Franchise.hasMany(Commerce);
Commerce.belongsTo(Franchise);
Bank.hasMany(Commerce);
Commerce.belongsTo(Bank);
City.hasMany(Commerce);
Commerce.belongsTo(City);
State.hasMany(Commerce);
Commerce.belongsTo(State);
Country.hasMany(Commerce);
Commerce.belongsTo(Country);
CommerceFact.hasMany(Commerce);
Commerce.belongsTo(CommerceFact);
Commerce.hasMany(Menu);
Menu.belongsTo(Commerce);
City.hasMany(State);
State.belongsTo(City);
State.hasMany(Country);
Country.belongsTo(State);
PosType.hasMany(Pos);
Pos.belongsTo(PosType);
Commerce.hasMany(Pos);
Pos.belongsTo(Commerce);
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
UnitType.hasMany(Recipe);
Recipe.belongsTo(UnitType);
Supplier.hasMany(Supply);
Supply.belongsTo(Supplier);
SuppliesType.hasMany(Supply);
Supply.belongsTo(SuppliesType);
UnitType.hasMany(Product);
Product.belongsTo(UnitType);
ProductType.hasMany(Product);
Product.belongsTo(ProductType);
Supplier.hasMany(Product);
Product.belongsTo(Supplier);
Category.hasMany(Menu);
Menu.belongsTo(Category);

UnitType.hasMany(SuppliesType);
SuppliesType.belongsTo(UnitType);

module.exports = {
  ...sequelize.models,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
