const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "supply",
    {
      name: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.FLOAT,
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
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: "supplies"
    }
  );
};
