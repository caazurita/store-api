const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');
const { da } = require('@faker-js/faker');

class CustomersService {



  constructor() { }

  async find() {
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM users');

    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data) {
    // const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
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




}
module.exports = CustomersService
