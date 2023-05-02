const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "bussines_types",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.INTEGER,
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
