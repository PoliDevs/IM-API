const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'posType',
    {
      type: {
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
      tableName: 'posTypes',
    },
  );
};
