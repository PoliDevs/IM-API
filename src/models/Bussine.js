const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "bussines",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cuil: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
