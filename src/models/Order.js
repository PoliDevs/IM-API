const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "orders",
    {
      date: {
        type: DataTypes.DATE,
      },
      hour: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      validity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
