const Product = require('../models/product');

exports.getMainPage = (req, res) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
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
    .getCart()
    .then((products) => {
      res.render('shop/cart', {
        path: '/cart',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    //.then((result) => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((prod) => {
              prod.orderItem = {
                quantity: prod.cartItem.quantity,
              };
              return prod;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      console.log(orders);
      res.render('shop/orders', {
        pageTitle: 'Orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
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

// https://i.pinimg.com/474x/59/fc/ec/59fcec512d9d744c8dfde260ae6fc3c0.jpg
//https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg
