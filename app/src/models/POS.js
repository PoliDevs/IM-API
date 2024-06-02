const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'pos',
    {
      qrCode: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: true,
      },
      surcharge: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      detail: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
      tableName: 'pos',
    },
  );
};
