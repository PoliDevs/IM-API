const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "products",
    {
      name: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      point_order: {
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      allergen_type: {
        type: DataTypes.STRING,
        defaultValue: "", //celiaco - diabético - lactosa
      },
      careful: {
        type: DataTypes.STRING,
        defaultValue: "", //celiacos
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
