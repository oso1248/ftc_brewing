const express = require('express')
const db = require('../queries/qryBrands')
const router = express.Router()

// -> /api/brand

//brw
router.post('/brw', (req, res) => {
  db.addBrw(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
    // .catch(err => res.status(500).send(err.detail))
})
router.post('/brw/get', (req, res) => {
  db.getAllBrw(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/brw/:name', (req, res) => {
  console.log('router hit')
  db.getByNameBrw(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/brw/:name', (req, res) => {
  db.changeBrw(req.params.name, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/brw/:name', (req, res) => {
  db.destroyBrw(req.params.name)
    .then(data => {
      if(!data) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

router.post('/brw/get/std', (req, res) => {
  db.getAllBrwStd(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/brw/get/crft', (req, res) => {
  db.getAllBrwStd(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/brw/get/dry', (req, res) => {
  db.getAllBrwDry(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/brw/get/sac', (req, res) => {
  db.getAllBrwSac(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})



//fin
router.post('/fin', (req, res) => {
  db.addFin(req.body)
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/fin/get', (req, res) => {
  db.getAllFin(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/fin/:name', (req, res) => {
  db.getByNameFin(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/fin/:name', (req, res) => {
  db.changeFin(req.params.name, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/fin/:name', (req, res) => {
  db.destroyFin(req.params.name)
    .then(data => {
      if(!data) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

//pck
router.post('/pck', (req, res) => {
  db.addPck(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/pck/get', (req, res) => {
  db.getAllPck(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/pck/:name', (req, res) => {
  db.getByNamePck(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/pck/:name', (req, res) => {
  db.changePck(req.params.name, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/pck/:name', (req, res) => {
  db.destroyPck(req.params.name)
    .then(data => {
      if(!data) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


// brand details
router.get('/detail/csxpre/:name', (req, res) => {
  db.getDetailByNameCsxPre(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        // res.status(200).json({msg: 'null'})
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/detail/csxpost/:name', (req, res) => {
  db.getDetailByNameCsxPost(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/detail/filpre/:name', (req, res) => {
  db.getDetailByNameFilPre(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/detail/filpost/:name', (req, res) => {
  db.getDetailByNameFilPost(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/detail/relpre/:name', (req, res) => {
  db.getDetailByNameRelPre(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/detail/relpost/:name', (req, res) => {
  db.getDetailByNameRelPost(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/detail/updatedetail', (req, res) => {
  // console.log(req.body[0][0].method)
  db.patchDetail(req.body)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))

})

// brand recipe
router.get('/recipe/chp/:name', (req, res) => {
  db.getRecipeByNameChp(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/recipe/sch/:name', (req, res) => {
  db.getRecipeByNameSch(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/recipe/fin/:name', (req, res) => {
  db.getRecipeByNameFin(req.params.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/detail/updaterecipe/:table', (req, res) => {
    if(req.params.table === 'chip') {
      db.patchRecipeChp(req.body)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
    } else if(req.params.table === 'schoene') {
      db.patchRecipeSch(req.body)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
    } else if(req.params.table === 'filtered') {
      db.patchRecipeFin(req.body)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
    }
  }
)

// methods cold
router.get('/method/cold', (req, res) => {
  db.getAllMethod()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

module.exports = router

