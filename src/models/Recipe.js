const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'recipe',
    {
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
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
      ingredients: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      supplies: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'recipes',
    },
  );
};
