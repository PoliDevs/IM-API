const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "states",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
