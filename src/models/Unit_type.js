const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "unit_types",
    {
      unit: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
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
