const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'category',
    {
      category: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'categories',
    },
  );
};
