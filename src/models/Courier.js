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
