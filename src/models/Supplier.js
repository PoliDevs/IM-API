const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "suppliers",
    {
      item: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      cuil: {
        type: DataTypes.STRING,
      },
      mail: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
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
