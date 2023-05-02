const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "commerces",
    {
      name: {
        type: DataTypes.STRING,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      workSchedule: {
        type: DataTypes.STRING,
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
    }
  );
};
