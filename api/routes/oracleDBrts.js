const express = require('express');
const db = require('../queries/oracleDBqry');
const router = express.Router();

// /api/oracle

router.post('/brewplan/get', (req, res) => {
  console.log('route');
  db.getBrewPlan()

    .then((data) => {
      console.log(data, 'return');
      if (data) {
        // console.log(data, 'none');
        res.status(200).json(data);
      } else {
        // console.log(data, 'some');
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
