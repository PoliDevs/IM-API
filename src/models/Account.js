const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "accounts",
    {
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "no_active", //active - no_active - cancel - suspended
      },
      email: {
        type: DataTypes.STRING,
      },
      google_user: {
        type: DataTypes.STRING,
      },
      facebook_user: {
        type: DataTypes.STRING,
      },
      twiter_user: {
        type: DataTypes.STRING,
      },
      validated_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
