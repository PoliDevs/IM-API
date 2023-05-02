const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orders",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      hour: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      validity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
