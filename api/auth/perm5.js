module.exports = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.permissions >= 5) {
    // console.log(req.session.user, req.session.user.permissions, 'perm5');
    next();
  } else {
    res.redirect('/index.html');
  }
};
