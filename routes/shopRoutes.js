const express = require('express');
const shopController = require('../controllers/shopController');
const isAuth = require('../utils/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);
//router.get('/products', shopController.getProducts);
router.get('/products/:itemId', shopController.getProduct); //такие пути с id должны быть всегда ниже /products/
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteItem);
router.get('/orders', isAuth, shopController.getOrders);
router.get('/checkout', isAuth, shopController.getCheckout);
router.get('/checkout/success', shopController.getCheckoutSuccess);
router.get('/checkout/cancel', shopController.getCheckout);

module.exports = router;
