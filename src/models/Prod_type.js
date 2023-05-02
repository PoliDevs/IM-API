const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "prod_types",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
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
