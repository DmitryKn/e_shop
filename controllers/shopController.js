const Product = require('../models/product');

exports.getMainPage = (req, res) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll((list) => {
    res.render('shop/product-list', {
      pageTitle: 'List',
      products: list,
    });
  });
};

exports.getProductDetails = (req, res) => {
  res.render('shop/product-details', {
    pageTitle: 'Details',
  });
};

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
  });
};
