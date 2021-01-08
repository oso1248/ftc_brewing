const express = require('express')
const db = require('../queries/qryMtx')
const router = express.Router()

// -> /api/mtx

//hop
router.post('/brnd', (req, res) => {
  
  if(req.body.method === 'update') {
    db.getBrndHopUpdate(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  } else {
    db.getBrndHopView(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  }
})
router.patch('/brnd/patch', (req, res) => {
  
  let brnd = req.body[0]
  req.body.shift()
  
  db.patchBrndHopUpdate(brnd.Pounds, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

//Dry
router.post('/dry', (req, res) => {
  if(req.body.method === 'update') {
    db.getBrndDryUpdate(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  } else {
    db.getBrndDryView(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  }
})
router.patch('/dry/patch', (req, res) => {
  
  let brnd = req.body[0]
  req.body.shift()
  db.patchBrndDryUpdate(brnd.Pounds, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

//sac
router.post('/sac', (req, res) => {
  if(req.body.method === 'update') {
    db.getBrndSacUpdate(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  } else {

    db.getBrndSacView(req.body.brand)
      .then(data => {
        if(data){
          res.status(200).json(data)
        } else {
          res.status(200).json({msg: 'null'})
        }
      })
      .catch(err => res.status(500).json({msg: err.detail}))
  }
})
router.patch('/sac/patch', (req, res) => {
  
  let brnd = req.body[0]
  req.body.shift()
  db.patchBrndSacUpdate(brnd.Units, req.body)
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