const express = require('express')
const router = express.Router()

const errMiddle = require('../middleware/errorMiddle')
const users_controller = require('../controllers/users_controller')
const notificationController = require('../controllers/notifications_controller')

router.get('/getUsers/:type', users_controller.getUsersByType)
router.get('/getReviews/:id', users_controller.getUserReviews)
router.get('/getGallery/:id', users_controller.getUserGallery)
router.get('/getServices/:id/:AtHome', users_controller.getServices)
router.get('/getArrivalTimes/:id', users_controller.getArrivalTimes)
module.exports = router