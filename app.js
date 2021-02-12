const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(adminRoutes);

app.use((req, res, next) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
