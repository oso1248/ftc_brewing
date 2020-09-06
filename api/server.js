const express = require('express')
const path = require('path')

const server = express()
server.use(express.json())



const userRouter = require('./routes/rtsUsers')
const supplierRouter = require('./routes/rtsSuppliers')
const breweryRouter = require('./routes/rtsBrewery')


server.use(express.static(path.join(__dirname, '../pages/site')))
// server.get('/', (req, res) => res.json({msg: 'I am always watching'}))


server.use('/api/user', userRouter)
server.use('/api/supplier', supplierRouter)
server.use('/api/brewery', breweryRouter)



module.exports = server