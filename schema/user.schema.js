const Joi = require('joi');


const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(15);
const email = Joi.string().email();
const password = Joi.string().min(6).max(15);
const image = Joi.string().uri();

const newUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required()
})


const updateUserSchema = Joi.object({
  name: name,
  email: email,
})

const getUserSchema = Joi.object({
    id: id.required()
})

module.exports = {
  newUserSchema,
  updateUserSchema,
  getUserSchema
}
