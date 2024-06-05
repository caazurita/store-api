const Joi = require('joi');


const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer();
const description = Joi.string().min(3);
const image = Joi.string().uri();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const newProductSchema = Joi.object({
  name: name.required(),
  categoryId: categoryId.required(),
  price: price.required(),
  description,
  image: image.required()
})

const updateProductSchema = Joi.object({
  name: name,
  categoryId: categoryId,
  price: price,
  description: description,
  image: image
})

const getProductSchema = Joi.object({
    id: id.required()
})

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min',{
    is: Joi.number().integer(),
    then: Joi.required(),
  })
})

module.exports = {
  newProductSchema,
  updateProductSchema,
  queryProductSchema,
  getProductSchema
}
