const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

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
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + '-' + file.originalname);
  },
});

app.set('view engine', 'ejs');
app.set('views', 'views');

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(multer({ dest: 'data/images' }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Flash messages to pages
app.use(flash());

//CSRF protection
app.use(csftProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//Middleware for user session
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
      next(new Error(err));
    });
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//Error Handling
app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    isAuthenticated: req.session.isLoggedIn,
  });
});

//Database connection
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log('DB connected');
  })
  .catch((err) => console.log('NO DB connection'));
