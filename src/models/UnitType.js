const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'unitType',
    {
      unit: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'unitTypes',
    },
  );
};
