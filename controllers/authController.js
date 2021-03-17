module.exports.getLogin = (req, res, next) => {
  res.render('auth/login');
};

module.exports.postLogin = (req, res, next) => {
  res.redirect('/');
};
