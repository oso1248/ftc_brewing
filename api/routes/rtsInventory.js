const express = require('express')
const db = require('../queries/qryInventory')
const router = express.Router()

// -> /api/inventory


// combined inventories
router.post('/combined/weekly/brw/view', (req, res) => {
  db.getByDateCombinedBrwWeekly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/combined/weekly/fin/view', (req, res) => {
  db.getByDateCombinedFinWeekly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/combined/weekly/log/view', (req, res) => {
  db.getByDateCombinedBrwWeekly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

router.post('/combined/monthly/brw/view', (req, res) => {
  db.getByDateCombinedBrwMonthly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/combined/monthly/fin/view', (req, res) => {
  db.getByDateCombinedFinMonthly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/combined/monthly/log/view', (req, res) => {
  db.getByDateCombinedBrwMonthly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

//mat inv weekly
router.post('/material/weekly', (req, res) => {
  req.body.username = req.session.user.username
  db.add(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('/material/weekly/:id', (req, res) => {
  db.getByID(req.params.id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/material/weekly/view', (req, res) => {
  db.getByDate(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/material/weekly/date', (req, res) => {
  db.getInvDateMaterial()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.patch('/material/weekly/:name', (req, res) => {
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
router.delete('/material/weekly/:id', (req, res) => {
  db.destroy(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json({msg: 'error: not deleted'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})



//mat inv monthly
router.post('/material/monthly', (req, res) => {
  req.body.username = req.session.user.username
  db.addMonthly(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.get('.material/monthly/:id', (req, res) => {
  db.getByIDMonthly(req.params.id)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/material/monthly/view', (req, res) => {
  db.getByDateMonthly(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/material/monthly/:id', (req, res) => {
  db.destroyMonthly(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json({msg: 'error: not deleted'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/material/monthly/date', (req, res) => {
  db.getInvDateMaterialMonthly()
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


//hop inv weekly
router.post('/hop/weekly', (req, res) => {
  req.body.username = req.session.user.username
  db.addInvHopWeekly(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/weekly/view/rolling', (req, res) => {
  db.getHopRollingInv(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/weekly/view', (req, res) => {
  db.getHopWeeklyInvHard(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/sets/view', (req, res) => {
  db.getSetsCombined(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/weekly/dates', (req, res) => {
  db.getInvHopWeeklyDate()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/hop/weekly/:id', (req, res) => {
  db.destroyHopInvWeekly(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json({msg: 'error: not deleted'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


// hop inv monthly
router.post('/hop/monthly', (req, res) => {
  req.body.username = req.session.user.username
  db.addInvHopMonthly(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/monthly/view', (req, res) => {
  db.getHopMonthlyInvHard(req.body)
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json({msg: 'null'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/monthly/dates', (req, res) => {
  db.getInvHopMonthlyDate()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/hop/monthly/:id', (req, res) => {
  db.destroyHopInvMonthly(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json({msg: 'error: not deleted'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


//hop inv daily
router.post('/hop/daily', (req, res) => {
  let user = req.session.user.username
  db.addInvHopDaily(req.body, user)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/daily/dates', (req, res) => {
  db.getInvHopDailyDate()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/daily/lastbrews', (req, res) => {
  db.getLastBrews(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/hop/daily/lots', (req, res) => {
  db.getHopLots(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


// hop daily view
router.post('/hop/daily/view', (req, res) => {
  db.getHopDaily(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})

// fin injection log
router.post('/fin/injection/log/add', (req, res) => {
  req.body.forEach(elem => {
    elem.username = req.session.user.username 
  })
  db.addFinInjectionLog(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/fin/injection/log/dates/weekly', (req, res) => {
  db.finInjectionLogDatesWeekly()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/fin/injection/log/dates/monthly', (req, res) => {
  db.finInjectionLogDatesMonthly()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/fin/injection/log/get', (req, res) => {
  db.finInjectionLogGet(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


// material archive
router.post('/material/archive/log/add', (req, res) => {
  
  req.body.username = req.session.user.username 
  
  db.addMatArchiveLog(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/material/archive/log/get', (req, res) => {
  db.getMatArchiveLog()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.delete('/material/archive/:id', (req, res) => {
  db.destroyArchive(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(200).json({msg: 'deleted'})
      } else {
        res.status(200).json({msg: 'error: not deleted'})
      }
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})


// finishing process loss wad add transfer
router.post('/process/wad/add', (req, res) => {
  
  req.body.username = req.session.user.username 
  
  db.addProcessWad(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/process/trans/add', (req, res) => {
  
  req.body.username = req.session.user.username 
  
  db.addProcessTrans(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/process/loss/add', (req, res) => {
  
  req.body.username = req.session.user.username 
  
  db.addProcessLoss(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/process/wad/get', (req, res) => {  
  db.getProcessWad()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/process/trans/get', (req, res) => {
  db.getProcessTrans()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})
router.post('/process/loss/get', (req, res) => {
  db.getProcessLoss()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => res.status(500).json({msg: err.detail}))
})



module.exports = router