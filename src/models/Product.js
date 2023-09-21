const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'product',
    {
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      name: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      pointOrder: {
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      allergenType: {
        type: DataTypes.STRING,
        defaultValue: '', // celiaco - diabético - lactosa
      },
      careful: {
        type: DataTypes.STRING,
        defaultValue: '', // celiacos
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
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'products',
    },
  );
};
