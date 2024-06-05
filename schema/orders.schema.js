const Joi = require('joi');


const id = Joi.number().integer().min(1);
const customerId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const orderId = Joi.number().integer();
const productId = Joi.number().integer();

const newOrderSchema = Joi.object({
  customerId: customerId.required()
})


const updateCustomerSchema = Joi.object({

})

const getOrderSchema = Joi.object({
  id: id.required()
})

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  amount: amount.required()
})

module.exports = {
  newOrderSchema,
  getOrderSchema,
  addItemSchema
}
