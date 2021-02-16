const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product');
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/products');
};

exports.getProducts = (req, res) => {
  Product.fetchAll((list) => {
    res.render('admin/products', {
      products: list,
    });
  });
};
