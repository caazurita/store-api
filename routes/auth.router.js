const express = require("express");
const { newUserSchema, updateUserSchema, getUserSchema } = require('../schema/user.schema');
const passport = require('passport');
const { config } = require('../config/config');
const router = express.Router();
const jwt = require('jsonwebtoken');


const AuthService = require('../services/auth.service');
const service = new AuthService();


router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {

      const data = await service.signToken(req.user);

      res.status(200).json({
        "success": true,
        "data": {
          "user": data.user,
          "token": data.token
        }
      });
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }

  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const data = await service.senPasswordRecovery(email);

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

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, password, confirmPassword } = req.body;

      const data = await service.changePassword(token, password);

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
