exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  req.session.save((err) => {
    //нужно для правильного апдейта из db
    console.log(err);
    res.redirect('/');
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
