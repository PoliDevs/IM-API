const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "prod_types",
    {
      type: {
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
