const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "account",
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
      birthDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("noActive", "active", "banned"),
        allowNull: true,
        defaultValue: "noActive",
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
    },
    {
      timestamps: false,
    }
  );
};
