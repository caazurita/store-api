const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');
class CategoriesService {



  constructor() {
    this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (error) => console.error(error));

  }


  async generate() {
    const limit = 20;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        'id': faker.datatype.uuid(),
        'name': faker.commerce.productName(),
        'price': parseInt(faker.commerce.price(), 10),
        'image': faker.image.url(),
        'blocked': faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data
    }


  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return {
      id
    }
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }
}
module.exports = CategoriesService
