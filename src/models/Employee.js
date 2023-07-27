const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "employee",
    {
      firstName: {
        type: DataTypes.STRING,
      },
      LastName: {
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
      birthDate: {
        type: DataTypes.DATE,
      },
      start: {
        type: DataTypes.DATE,
      },
      document: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      googleUser: {
        type: DataTypes.STRING,
      },
      facebookUser: {
        type: DataTypes.STRING,
      },
      twitterUser: {
        type: DataTypes.STRING,
      },
      validatedEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "employees"
    }
  );
};
