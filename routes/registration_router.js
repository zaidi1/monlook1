const express = require('express')
const router = express.Router()

// Require the controllers WHICH WE DID NOT CREATE YET!!
// eslint-disable-next-line camelcase
const errMiddle = require('../middleware/errorMiddle')
const regController = require('../controllers/registration_controller')
const notificationController = require('../controllers/notifications_controller')

// a simple test url to check that all of our files are communicating correctly.
router.post('/registeruser', regController.registeruser)
router.post('/verifyusercode', regController.verifyusercode)
router.post('/authenticateuser', regController.authenticateuser)
router.post('/uploadUserPicture', regController.uploadUserPicture)
router.post('/resendUserCode', regController.resendUserCode)
router.post('/resetPassword', regController.resetPassword);

router.get('/sendNotification', notificationController.sendNotificiation)

router.post('/test', regController.resendUserCode)

router.get('/testError', errMiddle((req, res, next) => {
  throw Error(' Testing ERROR 123 ')
}))

module.exports = router
