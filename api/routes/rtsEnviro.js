const express = require('express');
const db = require('../queries/qryEnviro');
const router = express.Router();

// -> /api/enviro

router.post('/', (req, res) => {
  db.add(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/all', (req, res) => {
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

router.post('/name', (req, res) => {
  db.getByName(req.params.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
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

router.post('/token', (req, res) => {
  let username = req.session.user.username;

  res.status(200).json({ key: `${process.env.TOKEN}`, user: username });
});

module.exports = router;
