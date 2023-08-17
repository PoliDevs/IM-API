const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'menu',
    {
      date: {
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      validity: {
        type: DataTypes.DATE,
        defaultValue: 0,
      },
      photo: {
        type: DataTypes.STRING,
      },
      dishes: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      tableName: 'menus',
    },
  );
};
