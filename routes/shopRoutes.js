const express = require('express');
const shopController = require('../controllers/shopControllers');

const router = express.Router();

router.get('/', shopController.getMainPage);
router.get('/products', shopController.getAllProducts);
router.get('/cart', shopController.getAllProducts);
router.get('/checkout', shopController.getProductDetails);
router.get('/product-details', shopController.getProductDetails);

module.exports = router;
