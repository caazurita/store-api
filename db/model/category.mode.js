const { Sequelize, DataTypes, Model } = require('sequelize');


const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaulValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    type: DataTypes.DATE,
    defaulValue: DataTypes.NOW
  }
}

class Category extends Model {
  //relacion de uno a muchos
  static associate(models) {
    this.hasMany(models.Product, {
      as: "products",
      foreignKey: "categoryId"
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: true
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }
