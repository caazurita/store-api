const { User, UserSchema, USER_TABLE } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Customer, CustomerSchema, CUSTOMER_TABLE } = require('./customer.model');
const { Category, CategorySchema } = require('./category.mode');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order_product.model');

function setupModels(sequelize) {
  // inicalizar los modelos
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  // relacionar los modelos

  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  Customer.associate(sequelize.models);

}

module.exports = setupModels;
