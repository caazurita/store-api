const Joi = require('joi');

const { newUserSchema } = require('./user.schema');

const id = Joi.number().integer().min(1);
const phone = Joi.string();
const active = Joi.boolean();
const userId = Joi.number().integer();

const newCustomerSchema = Joi.object({
  phone: phone.required(),
  active: active.required(),
  user: newUserSchema
})


const updateCustomerSchema = Joi.object({

})

const getCustomerSchema = Joi.object({

})

module.exports = {
  newCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
