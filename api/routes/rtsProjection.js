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

router.post('/', async (req, res) => {
  let weeks = [];

  await loadWeeks(weeks);

  db.getProjection(weeks)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
