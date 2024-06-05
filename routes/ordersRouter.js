const validatorHandler = require('../middleware/validator.handler');
const express = require("express");
const OrdersService = require('../services/orders.service');
const { getOrderSchema, newOrderSchema, addItemSchema } = require('../schema/orders.schema');
const { updateCategorySchema } = require('../schema/categories.schema');


const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const data = await service.find();
    res.status(200).json({
      "success": true,
      "data": data
    });
  } catch (error) {
    next(error)
  }

});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await service.findOne(id);
      res.status(200).json({
        "success": true,
        "data": data
      });
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(newOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);

      res.status(201).json({
        "success": true,
        "data": newCustomer
      });
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }

  }
);
router.post('/add_item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);

      res.status(201).json({
        "success": true,
        "data": newItem
      });
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }

  }
);

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedUser = await service.update(id, body);
      res.json({
        "success": true,
        "data": updatedUser
      });
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
