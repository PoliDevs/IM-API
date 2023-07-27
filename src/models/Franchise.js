const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "franchise",
    {
      name: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: "franchises"
    }
  );
};
