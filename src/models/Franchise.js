const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "franchises",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
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
