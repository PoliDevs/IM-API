const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'order',
    {
      order: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      hour: {
        type: DataTypes.TIME,
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
        type: DataTypes.DATEONLY,
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
      paid: {
        type: DataTypes.DOUBLE,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      tableName: 'orders',
    },
  );
};
