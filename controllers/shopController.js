const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
  });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        pageTitle: 'List',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const prodId = req.params.itemId;
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-details', {
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res) => {
  res.render('shop/product-details', {
    pageTitle: 'Details',
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteItem = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

// https://i.pinimg.com/474x/59/fc/ec/59fcec512d9d744c8dfde260ae6fc3c0.jpg
//https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg
