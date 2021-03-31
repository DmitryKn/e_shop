const express = require('express');
const adminController = require('../controllers/adminController');
const isAuth = require('../utils/is-auth');
const { body } = require('express-validator/check');
const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);
router.post(
  '/add-product',
  //add a new product validation
  [
    body('title')
      .isLength({ min: 3 })
      .isString()
      .trim()
      .withMessage('Title should be minimum 3 characters'),
    body('imageUrl').isURL().withMessage('Only valid url'),
    body('price').isFloat().withMessage('Price only numbers'),
    body('description')
      .isLength({ min: 5, max: 200 })
      .trim()
      .withMessage('Description should be minimum 5 characters.'),
  ],
  isAuth,
  adminController.postAddProduct
);
router.get('/products', isAuth, adminController.getProducts);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post(
  '/edit-product', //edit product validation
  [
    body('title')
      .isLength({ min: 3 })
      .isString()
      .trim()
      .withMessage('Title should be minimum 3 characters'),
    body('imageUrl').isURL().withMessage('Only valid url'),
    body('price').isFloat().withMessage('Price only numbers'),
    body('description')
      .isLength({ min: 5, max: 200 })
      .trim()
      .withMessage('Description should be minimum 5 characters.'),
  ],
  isAuth,
  adminController.postEditProduct
);
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
