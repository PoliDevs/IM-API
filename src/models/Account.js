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
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "no_active",//active - no_active - cancel - suspended
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twiter_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      validated_email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        
      },
    },
    {
      timestamps: false,
    }
  );
};