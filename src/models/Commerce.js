const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'commerce',
    {
      name: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      workSchedule: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phono: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: 'commerces',
    },
  );
};
