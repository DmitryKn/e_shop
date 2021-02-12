const Product = require('../models/product');

exports.getMainPage = (req, res) => {
  res.render('index');
};

exports.postProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/products');
};

exports.getAllproducts = (req, res) => {
  Product.fetchAll((list) => {
    res.render('products', {
      products: list,
    });
  });
};
