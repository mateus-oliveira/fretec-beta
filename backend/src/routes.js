const express = require('express');
const routes = express.Router();


const DriverController = require('./controllers/DriverController');
const RequestController = require('./controllers/RequestController');

routes.post('/api/driver', DriverController.createDriver)
routes.post('/api/request', RequestController.createRequest)

module.exports = routes;