const express = require('express');
const db = require('../queries/qryBrands');
const router = express.Router();

// -> /api/brand

//brw
router.post('/brw', (req, res) => {
  db.addBrw(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brw/get', (req, res) => {
  db.getAllBrw(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brw/name', (req, res) => {
  db.getByNameBrw(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.patch('/brw/:name', (req, res) => {
  db.changeBrw(req.params.name, req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/brw/:name', (req, res) => {
  db.destroyBrw(req.params.name)
    .then((data) => {
      if (!data) {
        res.status(200).json({ msg: 'deleted' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

router.post('/brw/get/std', (req, res) => {
  db.getAllBrwStd(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brw/get/crft', (req, res) => {
  db.getAllBrwStd(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brw/get/dry', (req, res) => {
  db.getAllBrwDry(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/brw/get/sac', (req, res) => {
  db.getAllBrwSac(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

//fin
router.post('/fin', (req, res) => {
  db.addFin(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/fin/get', (req, res) => {
  db.getAllFin(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/fin/get/name', (req, res) => {
  db.getByNameFin(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.patch('/fin/:name', (req, res) => {
  db.changeFin(req.params.name, req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/fin/:name', (req, res) => {
  db.destroyFin(req.params.name)
    .then((data) => {
      if (!data) {
        res.status(200).json({ msg: 'deleted' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/fin/ingredient/get', (req, res) => {
  db.getAllFinIngredient(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/fin/ingredient/brand/get', (req, res) => {
  db.getBrandFinIngredient(req.body.brand)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

//pck
router.post('/pck', (req, res) => {
  db.addPck(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/pck/get', (req, res) => {
  db.getAllPck(req.body.active)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/pck/get/name', (req, res) => {
  db.getByNamePck(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.patch('/pck/:name', (req, res) => {
  db.changePck(req.params.name, req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.delete('/pck/:name', (req, res) => {
  db.destroyPck(req.params.name)
    .then((data) => {
      if (!data) {
        res.status(200).json({ msg: 'deleted' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// brand details
router.post('/detail/csxpre', (req, res) => {
  db.getDetailByNameCsxPre(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/detail/csxpost', (req, res) => {
  db.getDetailByNameCsxPost(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/detail/filpre', (req, res) => {
  db.getDetailByNameFilPre(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/detail/filpost', (req, res) => {
  db.getDetailByNameFilPost(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/detail/relpre', (req, res) => {
  db.getDetailByNameRelPre(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/detail/relpost', (req, res) => {
  db.getDetailByNameRelPost(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.patch('/detail/updatedetail', (req, res) => {
  db.patchDetail(req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// brand recipe
router.post('/recipe/chp', (req, res) => {
  db.getRecipeByNameChp(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/recipe/sch', (req, res) => {
  db.getRecipeByNameSch(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.post('/recipe/fin', (req, res) => {
  db.getRecipeByNameFin(req.body.name)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});
router.patch('/detail/updaterecipe/:table', (req, res) => {
  if (req.params.table === 'chip') {
    db.patchRecipeChp(req.body)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ msg: 'null' });
        }
      })
      .catch((err) => res.status(500).json({ msg: err.detail }));
  } else if (req.params.table === 'schoene') {
    db.patchRecipeSch(req.body)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ msg: 'null' });
        }
      })
      .catch((err) => res.status(500).json({ msg: err.detail }));
  } else if (req.params.table === 'filtered') {
    db.patchRecipeFin(req.body)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(200).json({ msg: 'null' });
        }
      })
      .catch((err) => res.status(500).json({ msg: err.detail }));
  }
});

// Fin injection
router.patch('/fin/injection/update', (req, res) => {
  db.patchFinInjection(req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

// methods cold
router.post('/method/cold', (req, res) => {
  db.getAllMethod()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ msg: 'null' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.detail }));
});

module.exports = router;
