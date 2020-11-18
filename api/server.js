const express = require('express')
const path = require('path')
const session = require('express-session')


const server = express()
server.use(express.json())


const sessionConfig = {
  name: 'BudApp',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 180,
    secure: false, // set true for production for https
    httpOnly: true, // no js access
    sameSite: true
  },
  resave: false,
  saveUninitialized: true, // set to false for prod GDPR laws
}


server.use(session(sessionConfig))
const permissions1 = require('./auth/perm1')
const permissions5 = require('./auth/perm5')


const loginRouter = require('./auth/login')
const userRouter = require('./routes/rtsUsers')
const supplierRouter = require('./routes/rtsSuppliers')
const breweryRouter = require('./routes/rtsBrewery')
const commodityRouter = require('./routes/rtsCommodities')
const locationRouter = require('./routes/rtsLocation')
const typeRouter = require('./routes/rtsType')
const containerRouter = require('./routes/rtsContainer')
const enviroRouter = require('./routes/rtsEnviro')
const uomRouter = require('./routes/rtsUom')
const brandRouter = require('./routes/rtsBrands')
const inventoryRouter = require('./routes/rtsInventory')
const mtxRouter = require('./routes/rtsMtx')


server.use(express.static(path.join(__dirname, '../pages/login/')))
server.use('/api/auth', loginRouter)
server.use('/', permissions1)
server.use('/pgAdmin/', permissions5)
server.use(express.static(path.join(__dirname, '../pages/site/')))


server.use('/api/user', userRouter)
server.use('/api/supplier', supplierRouter)
server.use('/api/brewery', breweryRouter)
server.use('/api/commodity', commodityRouter)
server.use('/api/location', locationRouter)
server.use('/api/type', typeRouter)
server.use('/api/container', containerRouter)
server.use('/api/enviro', enviroRouter)
server.use('/api/uom', uomRouter)
server.use('/api/brand', brandRouter)
server.use('/api/inventory', inventoryRouter)
server.use('/api/mtx', mtxRouter)


module.exports = server