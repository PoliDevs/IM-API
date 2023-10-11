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
        defaultValue: 0,
      },
      costDelivery: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      additionals: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      products: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      dishes: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      menu: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      googleEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mpPayment: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      // accountId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true, // Permite valores nulos
      //   defaultValue: null, // Establece el valor predeterminado como null
      //   references: {
      //     model: 'accounts', // Debe coincidir con el nombre de la tabla de cuentas
      //     key: 'id', // Debe coincidir con la columna de clave primaria en la tabla de cuentas
      //   },
      //   // ...
      // },
    },
    {
      timestamps: true,
      tableName: 'orders',
    },
  );
};
