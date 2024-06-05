const validatorHandler = require('../middleware/validator.handler');
const CustomersService = require('../services/customers.service');
const express = require("express");
const { newCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schema/customer.schema');


const router = express.Router();
const service = new CustomersService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error)
  }

});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(newCustomerSchema, 'body'),
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

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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
