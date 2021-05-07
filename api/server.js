const express = require('express');
const path = require('path');
const cookie = require('./cookies');

const server = express();

const permissions1 = require('./auth/perm1');
const permissions3 = require('./auth/perm3');
const permissions5 = require('./auth/perm5');

const loginRouter = require('./auth/login');
const userRouter = require('./routes/rtsUsers');
const supplierRouter = require('./routes/rtsSuppliers');
const breweryRouter = require('./routes/rtsBrewery');
const commodityRouter = require('./routes/rtsCommodities');
const locationRouter = require('./routes/rtsLocation');
const typeRouter = require('./routes/rtsType');
const containerRouter = require('./routes/rtsContainer');
const enviroRouter = require('./routes/rtsEnviro');
const uomRouter = require('./routes/rtsUom');
const brandRouter = require('./routes/rtsBrands');
const inventoryRouter = require('./routes/rtsInventory');
const mtxRouter = require('./routes/rtsMtx');
const vesselRouter = require('./routes/rtsVessel');
const hibernateRouter = require('./routes/rtsHibernate');
const craftRouter = require('./routes/rtsCraftInv');
const oracleRouter = require('./routes/oracleDBrts');
const projectionRouter = require('./routes/rtsProjection');

server.use(express.json());
server.use(cookie.sessionConfig);

server.use(express.static(path.join(__dirname, '../pages/site/login/')));
server.use('/api/auth', loginRouter);
server.use('/pgAdmin/', permissions5);
server.use('/pgMaterials/', permissions3);
server.use('/', permissions1);
server.use(express.static(path.join(__dirname, '../pages/site/')));

server.use('/api/user', userRouter);
server.use('/api/supplier', supplierRouter);
server.use('/api/brewery', breweryRouter);
server.use('/api/commodity', commodityRouter);
server.use('/api/location', locationRouter);
server.use('/api/type', typeRouter);
server.use('/api/container', containerRouter);
server.use('/api/enviro', enviroRouter);
server.use('/api/uom', uomRouter);
server.use('/api/brand', brandRouter);
server.use('/api/inventory', inventoryRouter);
server.use('/api/mtx', mtxRouter);
server.use('/api/vessel', vesselRouter);
server.use('/api/hibernate', hibernateRouter);
server.use('/api/craft', craftRouter);
server.use('/api/oracle', oracleRouter);
server.use('/api/project', projectionRouter);

module.exports = server;
