const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'delivery',
    {
      name: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
      company: {
        type: DataTypes.STRING,
      },
      account: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
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
      fee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      logo: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'deliveries',
    },
  );
};
