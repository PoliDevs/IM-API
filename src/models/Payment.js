const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "payment",
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
      tableName: "payments"
    }
  );
};
