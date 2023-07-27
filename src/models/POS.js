const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pos",
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
      tableName: "pos"
    }
  );
};
