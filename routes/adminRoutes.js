const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getMainPage);
router.post('/add-product', productController.postProduct);
router.get('/products', productController.getAllproducts);

module.exports = router;
