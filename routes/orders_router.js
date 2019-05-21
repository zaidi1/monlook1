const express = require('express')
const router = express.Router()

// Require the controllers WHICH WE DID NOT CREATE YET!!
// eslint-disable-next-line camelcase
const errMiddle = require('../middleware/errorMiddle')
const notificationController = require('../controllers/notifications_controller')
const controller = require('../controllers/orders_controller')

// a simple test url to check that all of our files are communicating correctly.
router.post('/createOrder', controller.createOrder)
router.get('/GetCustomerOrders/:id', controller.GetCustomerOrders)

module.exports = router