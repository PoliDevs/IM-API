const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "recipes",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 1,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
