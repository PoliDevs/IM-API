const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'pos',
    {
      qrCode: {
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
    },
    {
      timestamps: false,
      tableName: 'pos',
    },
  );
};
