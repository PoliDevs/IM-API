const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'payment',
    {
      type: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      publicKey: {
        type: DataTypes.STRING,
      },
      accesToken: {
        type: DataTypes.STRING,
      },
      alias: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'payments',
    },
  );
};
