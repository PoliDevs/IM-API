const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "products",
    {
      name: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      pointOrder: {
        type: DataTypes.INTEGER,
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      allergenType: {
        type: DataTypes.STRING,
        defaultValue: "", //celiaco - diabético - lactosa
      },
      careful: {
        type: DataTypes.STRING,
        defaultValue: "", //celiacos
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
