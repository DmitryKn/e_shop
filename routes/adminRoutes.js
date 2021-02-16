const express = require('express');
const adminController = require('../controllers/adminControllers');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postAddProduct);
router.get('/products', adminController.getAllProducts);
router.get('/product-details', adminController.getProductDetails);

module.exports = router;
