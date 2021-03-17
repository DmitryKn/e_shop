exports.getLogin = (req, res, next) => {
  console.log(req.get('Cookie').split(';')[1]);
  res.render('auth/login', {
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  res.redirect('/');
};
