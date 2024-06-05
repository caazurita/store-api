const express = require("express");
const ProductService = require('../services/products.service');
const ValidatorHandler = require('../middleware/validator.handler');
const { newProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schema/products.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', ValidatorHandler(queryProductSchema, 'query'),
  async (req, res) => {

    const products = await service.find(req.query);
    res.json(
      products
    );

  })

router.get('/fliter', () => {
  res.send('Hello World!')
})

router.get('/:id',
  ValidatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      //ejecutar los middlewares con la funcion next()
      next(error)
    }
  });

router.post('/',
  ValidatorHandler(newProductSchema, 'body')
  , async (req, res, next) => {

    try {

      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        "success": true,
        "data": newProduct
      });

    } catch (error) {
      return next(error)
    }

  })

router.patch('/:id',
  ValidatorHandler(getProductSchema, 'params'),
  ValidatorHandler(updateProductSchema, 'body'),
  async (req, res) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.update(id, body);
      res.json({
        "success": true,
        "data": updateProduct
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }

  })

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteProduct = service.delete(id);
  res.json({
    "success": true,
    "data": deleteProduct
  });

})



module.exports = router;
