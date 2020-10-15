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
  db.getAllBrw(req.body.true)
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
router.get('/pck', (req, res) => {
  db.getAllPck()
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
  db.getByNamePack(req.params.name)
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

module.exports = router

