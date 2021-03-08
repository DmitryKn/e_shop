const express = require('express');
const bodyParser = require('body-parser');

const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const mongoDBConnection = require('./utils/database').mongoConnect;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render('404');
});

mongoDBConnection(() => {
  app.listen(3000);
});
