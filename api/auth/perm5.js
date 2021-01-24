module.exports = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.permissions >= 5) {
    next();
  } else {
    res.redirect('/index.html');
  }
};
