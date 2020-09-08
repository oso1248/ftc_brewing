const express = require('express')
const db = require('../queries/qryLocation')
const router = express.Router()

// -> /api/location

router.post('/', (req, res) => {
  db.add(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

router.get('/', (req, res) => {
  db.getAll()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

router.get('/:name', (req, res) => {
  db.getByName(req.params.name)
    .then(data => {
      if(data){
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
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json(data)
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

module.exports = router