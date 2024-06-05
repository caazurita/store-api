const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const cateogoriesRouter = require('./categories.router');
const customersRouter = require('./customersRouter');
const ordersRouter = require('./ordersRouter');


function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);

  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/users', usersRouter);
  router.use('/categories', cateogoriesRouter);
  router.use('/orders', ordersRouter);

}
module.exports = routerApi
