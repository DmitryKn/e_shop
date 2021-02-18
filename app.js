const express = require('express');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const db = require('./utils/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

db.execute('SELECT * FROM products')
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
