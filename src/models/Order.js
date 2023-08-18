const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'order',
    {
      date: {
        type: DataTypes.STRING,
      },
      hour: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(
          'orderPlaced',
          'processingOrder',
          'orderInPreparation',
          'orderReady',
          'delivered',
          'canceled',
        ),
        allowNull: true,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      validity: {
        type: DataTypes.INTEGER,
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
      rating: {
        type: DataTypes.INTEGER,
      },
      feedback: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      tableName: 'orders',
    },
  );
};
