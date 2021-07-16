const express = require('express');
const db = require('../queries/qryAppData');
const router = express.Router();

// api/startup

router.post('/suppliers', (req, res) => {
  db.startupSuppliers(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/commodities', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    req.body[i].updated_by = req.session.user.username;
  }
  db.startupCommodities(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brew', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    req.body[i].updated_by = req.session.user.username;
  }
  db.startupBrew(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/fin', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    req.body[i].updated_by = req.session.user.username;
  }
  db.startupFin(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/pack', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    req.body[i].updated_by = req.session.user.username;
  }
  db.startupPack(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/standardHops', (req, res) => {
  db.startupStandardHops(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/dryHops', (req, res) => {
  db.startupDryHops(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/superSacks', (req, res) => {
  db.startupSuperSacks(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
