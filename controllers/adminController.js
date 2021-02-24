const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  req.user
    .createProduct({ title, price, imageUrl, description })
    .then((result) => {
      res.redirect('/admin/products');
      console.log('Product created');
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  //Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products', {
        pageTitle: 'List',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    //Product.findByPk(prodId)
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save(); // saving changes in db
    })
    .then((result) => {
      console.log('Product updated');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log('Product deleted');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
