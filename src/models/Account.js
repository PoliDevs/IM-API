const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
        type: DataTypes.ENUM("noActive", "active", "banned"),
        allowNull: true,
        defaultValue: "noActive",
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
