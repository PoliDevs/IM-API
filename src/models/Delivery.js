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
