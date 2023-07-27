const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "menuType",
    {
      type: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: "menuTypes"
    }
  );
};
