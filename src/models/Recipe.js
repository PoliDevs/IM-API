const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'recipe',
    {
      name: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'recipes',
    },
  );
};
