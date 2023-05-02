const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "bussines",
    {
      name: {
        type: DataTypes.STRING,
      },
      cuil: {
        type: DataTypes.INTEGER,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      email: {
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
