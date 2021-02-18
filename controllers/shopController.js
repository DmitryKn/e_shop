const Product = require('../models/product');
const Cart = require('../models/Cart');

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

exports.getProduct = (req, res) => {
  const prodId = req.params.itemId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-details', {
      product: product,
    });
  });
};

exports.getProductDetails = (req, res) => {
  res.render('shop/product-details', {
    pageTitle: 'Details',
  });
};

exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
  });
};

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
  });
};

exports.postCartDeleteItem = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};
