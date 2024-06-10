const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');
const { da } = require('@faker-js/faker');

class OrdersService {



  constructor() { }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const data = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'items'
        }
      ]
    });
    if (!data) {
      throw boom.notFound('Order not found');
    }
    return data;
  }

  async findByCustomer(id) {
    const data = await models.Order.findAll({
      where: {
        '$customer.user.id$': id
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })

    return data
  }

  async create(userId, data) {
    const customer = await models.Customer.findOne({
      where: {
        userId
      }
    })
    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    data = {
      ...data,
      customerId: customer.id
    }

    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const res = await user.update(data);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }




}
module.exports = OrdersService
