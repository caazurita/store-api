const validatorHandler = require('../middleware/validator.handler');
const UsersService = require('../services/users.service');
const express = require("express");
const { newUserSchema, updateUserSchema, getUserSchema } = require('../schema/user.schema');


const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error)
  }

});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
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
  validatorHandler(newUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);

      res.status(201).json({
        "success": true,
        "data": newUser
      });
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }

  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
