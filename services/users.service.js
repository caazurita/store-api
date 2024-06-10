const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');

class UsersService {



  constructor() { }

  async find() {
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM users');

    const res = await models.User.findAll({
      include: ['customer']
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

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email
      }
    });

    return user;
  }

  async create(data) {
    // const hash = await bcrypt.hash(data.password, 10);
    // const newUser = await models.User.create({
    //   ...data,
    //   password: hash
    // });

    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
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
module.exports = UsersService
