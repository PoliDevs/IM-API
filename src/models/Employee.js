const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "employees",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      surname: {
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
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebookUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twitterUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      validatedEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
