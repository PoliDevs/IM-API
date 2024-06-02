const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'courierType',
    {
      type: {
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
      tableName: 'courierTypes',
    },
  );
};
