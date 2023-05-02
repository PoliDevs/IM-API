const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "menu_types",
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
    }
  );
};
