const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'commercialPlan',
    {
      plan: {
        type: DataTypes.STRING,
      },
      validity: {
        type: DataTypes.DATE,
      },
      cost: {
        type: DataTypes.FLOAT,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      scope: {
        type: DataTypes.TEXT,
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
      timestamps: true,
      tableName: 'commercialPlan',
    },
  );
};
