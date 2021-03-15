const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');

const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use((req, res, next) => {
  User.findById('6046643a041bb6875274ba79')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render('404');
});

mongoose
  .connect(
    'mongodb+srv://Dimko:root@cluster0.xuwwp.mongodb.net/e_shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(3000);
    console.log('DB connected');
  })
  .catch((err) => console.log('NO DB connection'));
