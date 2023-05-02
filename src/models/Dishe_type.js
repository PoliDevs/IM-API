const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "dishe_types",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
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
