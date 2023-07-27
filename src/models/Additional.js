const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "additional",
    {
      name: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
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
      photo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "additionals"
    }
  );
};
