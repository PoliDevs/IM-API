const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'tableService',
    {
      type: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      validity: {
        type: DataTypes.DATE,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'tableServices',
    },
  );
};
