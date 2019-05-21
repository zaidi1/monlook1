
var fcmAdmin = require('../models/firebaseadmin').fcmAdmin
// import fcmAdmin from '../models/firebaseadmin'

/// / ==========  NOTIFICATIONS TESTING  =========
// et5uzT-LppA:APA91bGxaPmFAulBwZyO4Xx1WGCKIgAQtjhBXOkv7ehxzIwZh7ZTPr42WJAk2fOQGejn7bYM2ycRQUc4KymE2kQYRm8yXS2T9B7QIu-RjxSttYjXbDRAAJrtCPopWTn1gTUpAnUnXYwe
exports.sendNotificiation = () => {
  var registrationToken = 'fP-CoR7sej0:APA91bGmJeVRYjX3NCGTIio-s5Xc4g5nwYM5eoe3NuJz8RHpkALqCZ5xK4c-8lDTI5JAEk6B7Uv6BxReb0HwMf_4jPfPzyImPJOoxMajNZgDkcBDSgS9tdLRG70aG1O7dcNkF--KOYf2'
  var payload = {
    notification: {
      title: 'Notification Title',
      body: 'This is the body of the notification message.'
    }
  }

  var options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  }

  fcmAdmin.messaging().sendToDevice(registrationToken, payload).then(function (response) {
    console.log('Successfully sent message: ', JSON.stringify(response))
  }).catch(function (error) {
    console.log('Error sending message: ', error)
  })
}

// sendNotificiation()
// function testError() {
//   throw new Error("Test Exception thrown")
// }
// testError()
/// / =========   END NOTFICATIONS END   ========
