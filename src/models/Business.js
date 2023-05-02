const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "bussines",
    {
      name: {
        type: DataTypes.STRING,
      },
      cuil: {
        type: DataTypes.INTEGER,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
