const express = require("express");

const CategoriesService = require("../services/categories.service");
const validatorHandler = require("../middleware/validator.handler");
const { checkAdminRole, checkRoles } = require("../middleware/auth.handler");

const { newCategorySchema, getCategorySchema } = require("../schema/categories.schema");
const passport = require("passport");

const router = express.Router();
const service = new CategoriesService();

router.get('/categories/:category_id/products/:product_id', (req, res) => {
  const { category_id, product_id } = req.params;
  res.json({
    category_id: category_id,
    product_id: product_id
  })

})


router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error)
    }
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Category = await service.findOne(id);
      res.status(200).json({
        "success": true,
        "data": Category
      });
    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(newCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      return res.status(201).json({
        "success": true,
        "data": newCategory
      })
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router
