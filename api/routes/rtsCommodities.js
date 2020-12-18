const express = require('express')
const db = require('../queries/qryCommodities')
const router = express.Router()

// -> /api/commodity

router.post('/', (req, res) => {
  db.add(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/get', (req, res) => {
  db.getAll(req.body.active)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/name', (req, res) => {
  db.getByName(req.body.name)
    .then(data => {
      if(data){
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


router.post('/get/type/:type', (req, res) => {
  db.getByType(req.body.active, req.params.type)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/:name', (req, res) => {
  db.change(req.params.name, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/:name', (req, res) => {
  db.destroy(req.params.name)
    .then(data => {
      if(!data) {
        res.status(200).json({msg: "deleted"})
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

module.exports = router