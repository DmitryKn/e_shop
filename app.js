const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/user');
const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/auth');
const path = require('path');
const errorController = require('./controllers/errorController');

const app = express();
const MONGODB_URI =
  'mongodb+srv://Dimko:root@cluster0.xuwwp.mongodb.net/e_shop';
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
const csftProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

//Middleware
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
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

//CSRF protection
app.use(csftProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use(errorController.get404);

//Database connection
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log('DB connected');
  })
  .catch((err) => console.log('NO DB connection'));
