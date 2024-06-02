const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'supplier',
    {
      item: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      name: {
        type: DataTypes.STRING,
      },
      ssn: {
        type: DataTypes.STRING,
      },
      mail: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'suppliers',
    },
  );
};
