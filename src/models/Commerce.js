const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "commerces",
    {
      name: {
        type: DataTypes.STRING,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      workSchedule: {
        type: DataTypes.STRING,
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
