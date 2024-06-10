const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


const USER_TABLE = 'users';

const UserSchema = {
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
  email: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      hooks:{
        beforeCreate: async (user, options) => {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        }
      }
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE }
