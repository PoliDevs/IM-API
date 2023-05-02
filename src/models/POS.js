const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pdvs",
    {
      qrCode: {
        type: DataTypes.STRING,
        defaultValue: "",
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
