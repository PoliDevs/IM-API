const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "franchises",
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
    }
  );
};
