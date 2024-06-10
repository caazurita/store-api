const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const cateogoriesRouter = require('./categories.router');
const customersRouter = require('./customersRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/users', usersRouter);
  router.use('/categories', cateogoriesRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);

}
module.exports = routerApi
