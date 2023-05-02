const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "suppliers",
    {
      item: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      cuil: {
        type: DataTypes.STRING,
      },
      mail: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      contact: {
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
