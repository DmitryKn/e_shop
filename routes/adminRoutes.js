const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getMainPage);
router.get('/add-product', productController.getAddProduct);
router.post('/add-product', productController.postAddProduct);
router.get('/product-list', productController.getAllProducts);
router.get('/product-details', productController.getProductDetails);

module.exports = router;
