const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "dishType",
    {
      type: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: "dishTypes"
    }
  );
};
