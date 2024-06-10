const express = require("express");
const passport = require('passport');
const router = express.Router();

const OrderService = require('../services/orders.service');
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const data = await service.findByCustomer(user.sub);
      res.status(200).json({
        "success": true,
        "data": data
      });
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }

  }
);


module.exports = router
