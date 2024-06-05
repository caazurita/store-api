const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/model'); //no se requiere el index.js ya que es el archivo principal y lo importa por defecto.

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

setupModels(sequelize);
// sequelize.sync();

module.exports = sequelize
