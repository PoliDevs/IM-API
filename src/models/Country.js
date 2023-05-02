const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "countries",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
