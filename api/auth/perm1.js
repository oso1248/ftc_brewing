module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // console.log(req.session.user, req.session.user.permissions, 'perm1');
    next();
  } else {
    res.redirect('/login.html');
  }
};
