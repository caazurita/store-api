const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');
class ProductsService {



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

    // const newProduct = {
    //   'id': faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    // return newProduct;

    const newProduct = await models.Product.create(data);
    return newProduct;
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

  async find(query) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 5000);
    // })

    // const query = 'SELECT * FROM tasks';
    // const [data] = await sequelize.query(query);
    // return data
    const { limit, offset, price_max, price_min } = query
    const options = {
      include: ['category'],
      where: {}
    };

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price_max && price_min) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = models.Product.findAll(options);
    return products
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.blocked) {
      throw boom.conflict('product is blocked');
    }
    return product;
  }
}
module.exports = ProductsService
