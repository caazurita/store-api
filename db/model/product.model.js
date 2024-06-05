const { allow } = require('joi');
const { Sequelize, DataTypes, Model } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.mode');


const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  price: {
    allowNull: true,
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
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

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category'
    })
    // this.belongsToMany(models.Order, {
    //   as: 'orders',
    //   through: models.OrderProduct,
    //   foreignKey: 'productId',
    //   otherKey: 'orderId'
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: true
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE }
