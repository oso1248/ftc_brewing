const express = require('express')
const path = require('path')

const server = express()
server.use(express.json())



const supplierRouter = require('./routes/rtsSuppliers')


// server.use(express.static(path.join(__dirname, '../pages/site')))
server.get('/', (req, res) => res.json({msg: 'I am always watching'}))


server.use('/api/supplier', supplierRouter)



module.exports = server