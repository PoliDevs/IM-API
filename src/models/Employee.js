const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
      birthdate: {
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
