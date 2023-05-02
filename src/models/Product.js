const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      point_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      allergen_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "", //celiaco - diabético - lactosa
      },
      careful: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "", //celiacos
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
