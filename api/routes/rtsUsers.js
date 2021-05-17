const express = require('express');
const db = require('../queries/qryUsers');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', (req, res) => {
  const creds = req.body;
  creds.password = bcrypt.hashSync(creds.password, 6);
  db.add(creds)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/get', (req, res) => {
  db.getAll()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/:name', (req, res) => {
  db.getByName(req.params.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json(err.detail));
});
router.patch('/:name', (req, res) => {
  db.change(req.params.name, req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/:name', (req, res) => {
  db.destroy(req.params.name)
    .then((data) => {
      if (!data) {
        res.status(200).json({ msg: 'deleted' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/manpower/add', (req, res) => {
  req.body.updated_by = req.session.user.username;
  db.addManpower(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/manpower/get', (req, res) => {
  db.getManpower(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/manpower/delete', (req, res) => {
  db.deleteManpower(req.body.id)
    .then((data) => {
      if (!data) {
        res.status(200).json({ msg: 'deleted' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
