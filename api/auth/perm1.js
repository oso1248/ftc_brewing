module.exports = (req, res, next) => {
  if(req.session && req.session.user) {
    next()
  } else {
    // res.status(401).json({msg: 'no this time bro'})
    res.redirect('/login.html')
  }
  // next()
}