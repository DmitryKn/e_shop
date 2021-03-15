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

app.use((req, res, next) => {
  User.findById('604f9e39254334b1b01e11ba')
    .then((user) => {
      req.user = user; //это нужно временно для использования
      next();
    })
    .catch((err) => console.log(err));
});

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
    /*const user = new User({
      name: 'Dimko',
      email: 'test@test.com',
      cart: { items: [] },
    });
    user.save();*/
    app.listen(3000);
    console.log('DB connected');
  })
  .catch((err) => console.log('NO DB connection'));
