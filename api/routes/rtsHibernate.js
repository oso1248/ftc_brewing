const express = require('express')
const db = require('../queries/qryHibernate')
const router = express.Router()

// -> /api/hibernate
router.post('/', (req, res) => {
  req.body.username1 = req.session.user.username
  db.add(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hibernated/tanks/get', (req, res) => {
  db.getHibernatedTankList()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hibernated/tank/get/:id', (req, res) => {
  db.getById(req.params.id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/hibernated/tank/:id', (req, res) => {
  req.body.username2 = req.session.user.username
  db.update(req.params.id, req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hibernated/log/get', (req, res) => {
  db.getHibernatedLog()
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



router.post('/hibernate/tanks/get', (req, res) => {
  db.getAllHibernateTanks()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hibernate/chiptanks/get', (req, res) => {
  db.getAllHibernateChipTanks()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


//type
router.post('/type/get', (req, res) => {
  db.getAllVesselTypes()
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