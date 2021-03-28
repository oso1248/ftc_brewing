const express = require('express');
const db = require('../queries/qryProjection');
const router = express.Router();

const { DateTime } = require('luxon');
let projectWeek = DateTime.local().startOf('week').toFormat('yyyy-MM-dd');

function loadWeeks(weeks) {
  for (let i = 0; i < 9; i++) {
    let projectWeek = DateTime.local().startOf('week').plus({ week: i }).toFormat('yyyy-MM-dd');
    weeks.push(projectWeek);
  }
}

router.post('/commodities', async (req, res) => {
  let weeks = [];

  await loadWeeks(weeks);

  db.getCommodityProjection(weeks)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/craft', async (req, res) => {
  db.getCraftProjection()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/craft/branddata', async (req, res) => {
  db.getBrandData(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
