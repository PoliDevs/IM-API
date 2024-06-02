const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'dish',
    {
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      photo: {
        type: DataTypes.STRING,
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
      surcharge: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      estimatedTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      amountAdditional: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
      amountSupplies: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'dishes',
    },
  );
};
