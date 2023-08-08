const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'bank',
    {
      account: {
        type: DataTypes.STRING,
      },
      number: {
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
      tableName: 'banks',
    },
  );
};
