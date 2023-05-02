const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orders",
    {
      date: {
        type: DataTypes.DATE,
      },
      hour: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      validity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
