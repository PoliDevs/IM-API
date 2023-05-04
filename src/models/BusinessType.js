const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "businessType",
    {
      type: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.INTEGER,
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
