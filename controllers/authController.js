exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  req.isLoggedIn = true;
  res.redirect('/');
};
