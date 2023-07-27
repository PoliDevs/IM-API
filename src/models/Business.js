const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "business",
    {
      name: {
        type: DataTypes.STRING,
      },
      ssn: {
        type: DataTypes.STRING,
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
      tableName: "business"
    }
  );
};
