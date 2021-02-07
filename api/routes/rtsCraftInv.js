const express = require('express');
const db = require('../queries/qryCraftInv');
const router = express.Router();

// api/craft

// tied
router.post('/ties/add', (req, res) => {
  req.body.user_tied = req.session.user.username;
  db.addTied(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/tied/view', (req, res) => {
  db.getTied()
    .then((data) => {
      if (data.rows) {
        res.status(200).json(data.rows);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/tied/inv/delete', (req, res) => {
  db.tiedInvDelete(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// trailer
router.post('/trailer/add', (req, res) => {
  let data = {};
  data.user_create = req.session.user.username;
  db.addTrailer(data)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/trailer/check', (req, res) => {
  db.getTrailerLast()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/trailer/inv/view/:id', (req, res) => {
  db.getTrailerInv(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/trailer/inv/add', (req, res) => {
  req.body.user_load = req.session.user.username;
  db.trailerInvAdd(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/trailer/inv/delete', (req, res) => {
  db.trailerInvDelete(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/trailer/count', (req, res) => {
  db.getTrailerCount(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// receive trailer
router.post('/trailer/get', (req, res) => {
  db.trailerGet()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/trailer/receive', (req, res) => {
  req.body.username = req.session.user.username;
  db.trailerReceive(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// 3rd floor
router.post('/floor/inv/view', (req, res) => {
  db.getFloorInv()
    .then((data) => {
      if (data.rows) {
        res.status(200).json(data.rows);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/floor/inv/add', (req, res) => {
  db.addFloorInv(req.body)
    .then((data) => {
      if (data.rows) {
        res.status(200).json(data.rows);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/floor/inv/use/', (req, res) => {
  req.body.username = req.session.user.username;
  db.useFloorInv(req.body)
    .then((data) => {
      if (data.rows) {
        res.status(200).json(data.rows);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// material inventory less tied
router.post('/material/inv/view', (req, res) => {
  db.getUnTiedInv(req.body)
    .then((data) => {
      if (data.rows) {
        res.status(200).json(data.rows);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

///////////////
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
router.patch('/:id', (req, res) => {
  db.changeTied(req.params.id, req.body)
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

module.exports = router;
