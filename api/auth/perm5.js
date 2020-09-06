module.exports = (req, res, next) => {
  if(req.session && req.session.user && req.session.user.permissions === 5) {
    next()
  } else {
    // res.status(401).json({msg: 'no this time bro'})
    res.redirect('/index.html')
  }
  // next()
}