const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/', shopController.getMainPage);
router.get('/products', shopController.getProducts);
router.get('/products/:itemId', shopController.getProduct); //такие пути с id должны быть всегда ниже /products/
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.post('/cart-delete-item', shopController.postCartDeleteItem);

module.exports = router;
