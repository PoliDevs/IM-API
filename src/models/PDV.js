const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pdvs",
    {
      qrcode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
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
