const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/auth');
const path = require('path');

const User = require('./models/user');

const app = express();
const MONGODB_URI =
  'mongodb+srv://Dimko:root@cluster0.xuwwp.mongodb.net/e_shop';
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
/*
app.use((req, res, next) => {
  User.findById('604f9e39254334b1b01e11ba')
    .then((user) => {
      req.user = user; //это нужно временно для использования
      next();
    })
    .catch((err) => console.log(err));
});
*/
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  res.render('404', { isAuthenticated: req.session.isLoggedIn });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log('DB connected');
  })
  .catch((err) => console.log('NO DB connection'));
