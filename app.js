const express = require('express');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  res.render('404');
});

Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((results) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
