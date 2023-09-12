const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'courier',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      document: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      cp: {
        type: DataTypes.STRING,
      },
      bank: {
        type: DataTypes.STRING,
      },
      account: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      surcharge: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'couriers',
    },
  );
};
