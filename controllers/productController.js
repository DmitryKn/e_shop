const Product = require('../models/product');

exports.getMainPage = (req, res) => {
  res.render('index');
};

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/product-list');
};

exports.getAllProducts = (req, res) => {
  Product.fetchAll((list) => {
    res.render('shop/product-list', {
      products: list,
    });
  });
};

exports.getProductDetails = (req, res) => {
  res.render('shop/product-details');
};
