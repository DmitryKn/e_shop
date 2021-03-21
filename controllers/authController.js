exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  req.session.save((err) => {
    //нужно для правильного апдейта из db иначе не будет гарантии что все загрузится вовремя
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

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    isAuthenticated: false,
  });
  res.redirect('/');
};

exports.postSignup = (req, res, next) => {
  res.render('auth/signup', {
    isAuthenticated: req.session.isLoggedIn,
  });
  res.redirect('/');
};
