const express = require('express');
const db = require('../dbConfig');
const bcrypt = require('bcryptjs');
const router = express.Router();

function getPass(name) {
  return db('users')
    .select('username', 'password', 'permissions')
    .where({ username: name })
    .first();
}
async function deleteSess(name) {
  await db.raw(`
   DELETE
   FROM session
   WHERE sess -> 'user' ->> 'username' = '${name}'
  `);
  return { msg: 'null' };
}

// -> /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'username & password required' });
  }

  getPass(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          username: user.username,
          permissions: user.permissions,
        };

        res.status(200).json({ msg: 'pass' });
      } else {
        res.status(400).json({ msg: 'invalid credentials' });
      }
    })
    .catch((err) => res.status(500).json(err.detail));
});

router.post('/logout', (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ msg: 'no user' });
    return;
  }
  deleteSess(req.session.user.username).then((data) => {
    req.session.destroy((error) => {
      if (error) {
        res
          .status(500)
          .json({ msg: `You Can Checkout Anytime But You Can Never Leave` });
      } else {
        res.status(200).json({ msg: 'goodbye' });
      }
    });
  });
});

module.exports = router;
