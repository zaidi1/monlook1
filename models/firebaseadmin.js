// import * as admin from 'firebase-admin'
const admin = require('firebase-admin')
var serviceAccount = require('./monlook-a0a6b-firebase-adminsdk-w7d8t-69ada65a29.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://monlook-d1c70.firebaseio.com'
})
module.exports.fcmAdmin = admin
